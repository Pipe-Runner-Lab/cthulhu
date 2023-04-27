import numpy as np
from numpy.linalg import inv
import math
# from js import force_x, force_y

# State Integrators
class RK4_Integrator:
    def __init__(self, x_0, t_0, t_n, dt, dx):
        self.x_0 = x_0
        self.t_0 = t_0
        self.t_n = t_n
        self.dt = dt
        self.dx = dx
        
        self.x = None
        self.t = None
    
    def step(self, u = None):
        if self.t is not None and (self.t + self.dt) > self.t_n:
            return None
        
        if self.x is None:
            self.x = self.x_0
            self.t = self.t_0
        else:
            x = self.x
            t = self.t
            dt = self.dt
            
            k1 = self.dx(x, t, u)
            k2 = self.dx(x + dt * k1 / 2, t + dt / 2, u)
            k3 = self.dx(x + dt * k2 / 2, t + dt / 2, u)
            k4 = self.dx(x + dt * k3, t + dt, u)
        
            x = x + dt * (k1 + 2*k2 + 2*k3 + k4) * (1/6)
            
            self.x = x
            self.t += self.dt
        
        return self.x, self.t
    
# Vessel dymaics
M = np.array([
    [25.8, 0, 0],
    [0, 33.8, 6.2],
    [0, 6.2, 2.76]
])

Bt = np.array([
    [1, 0],
    [0, 0],
    [0, 1]
])

Minv = inv(M)

def eta(u, v, sai):
    return np.array([u, v, sai]).T

def nu(x, y, r):
    return np.array([x, y, r]).T

def C(V):
    u = V[0][0]
    v = V[1][0]
    r = V[2][0]
    c13 = -33.8*v -(6.2+6.2)*r/2
    c23 = 25.8*u
    return np.array([
        [0, 0, c13],
        [0, 0, c23],
        [-c13, -c23, 0]
    ])

# To remove abs, we have to make sure force stays constant
def D(V):
    u = V[0][0]
    v = V[1][0]
    r = V[2][0]
    return -np.array([
        [-12 - 2.1 * u, 0, 0],
        [0, -17 - 4.5 * v , -0.2],
        [0, -0.5, -0.5 - 0.1 * -r]
    ])

def R(sai):
    return np.array([
        [np.cos(sai), -np.sin(sai), 0],
        [np.sin(sai), np.cos(sai), 0],
        [0, 0, 1]
    ])


def B():
    a = np.array([
        [0, 0],
        [0, 0],
        [0, 0]
    ])
    b = Minv@Bt
    c = np.concatenate((a, b), axis=0)
    return c

def fx(X):
    V = X[3:]
    sai = X[2][0]
    
    a = R(sai) @ V
    b = -Minv @ (C(V) + D(V)) @ V
    c = np.array([a, b]).reshape((-1, 1))
    return c

# X = [x, y, r, u, v, sai]
def dx(X, t = None, U = np.array([0, 0]).reshape((-1, 1))):
    return fx(X) + (B() @ U)

# testing
X_0 = np.array([1, 2, 3, 4, 5, 6]).reshape((-1, 1))
U = np.array([0, 0]).reshape((-1, 1))

dx(
    X_0, 
    t = 0, 
    U = U
)

force_array = [
    [0., [1, -1]],
    [30., [-1, 1]]
]
force_idx = 0

theta_array = [
    [0., [0., 0.]],
    [100., [0.2, 0.3]],
    [150., [0., 0.]],
]
theta_idx = 0

Jf = lambda x,y,psi,u,v,r: (np.array([[0, 0, -u*math.sin(psi) - v*math.cos(psi), math.cos(psi), -math.sin(psi), 0], [0, 0, u*math.cos(psi) - v*math.sin(psi), math.sin(psi), math.cos(psi), 0], [0, 0, 0, 0, 0, 1], [0, 0, 0, -0.162790697674419*u - 0.465116279069767, 1.31007751937984*r, 0.48062015503876*r + 1.31007751937984*v], [0, 0, 0, -0.597432905484247*r + 0.904317386231039*v, 0.904317386231039*u - 0.452887981330222*v - 0.798935239206535, -0.022607934655776*r - 0.597432905484247*u + 0.0464556592765461], [0, 0, 0, -0.904317386231039*r - 4.92998833138856*v, -4.92998833138856*u + 1.01735705950992*v + 1.61355017502917, 0.123249708284714*r - 0.904317386231039*u - 0.285516336056009]]))

def get_force(t):
    global force_idx
    
    # only one element or last element
    if len(force_array) == 1 or force_idx + 1 == len(force_array):
        return force_array[-1][1]

    if t > force_array[force_idx + 1][0]:
        force_idx += 1

    return force_array[force_idx][1]

def get_theta(t):
    global theta_idx
    
    # only one element or last element
    if len(theta_array) == 1 or theta_idx + 1 == len(theta_array):
        return theta_array[-1][1]

    if t > theta_array[theta_idx + 1][0]:
        theta_idx += 1

    return theta_array[theta_idx][1]

def log_data(table, x, x_hat, t, theta, theta_hat ):
    table["Position (X)"].append(x[0][0])
    table["Position (X`)"].append(None if x_hat is None else x_hat[0][0])
    table["Position (Y)"].append(x[1][0])
    table["Position (Y`)"].append(None if x_hat is None else x_hat[1][0])
    table["Position (Sai)"].append(x[2][0])
    table["Position (Sai`)"].append(None if x_hat is None else x_hat[2][0])
    table["Vel (u)"].append(x[3][0])
    table["Vel (u`)"].append(None if x_hat is None else x_hat[3][0])
    table["Vel (v)"].append(x[4][0])
    table["Vel (v`)"].append(None if x_hat is None else x_hat[4][0])
    table["yaw rate (r)"].append(x[5][0])
    table["yaw rate (r`)"].append(None if x_hat is None else x_hat[5][0])
    table["Time"].append(t)
    table["theta 1"].append(theta[0][0])
    table["theta 1`"].append(None if theta_hat is None else theta_hat[0][0])
    table["theta 2"].append(theta[1][0])
    table["theta 2`"].append(None if theta_hat is None else theta_hat[1][0])

# AEKF
def run():
    output = {
        "Position (X)": [], 
        "Position (X`)": [],
        "Position (Y)": [], 
        "Position (Y`)": [],
        "Position (Sai)": [], 
        "Position (Sai`)": [],
        "Vel (u)": [], 
        "Vel (u`)": [],
        "Vel (v)": [], 
        "Vel (v`)": [],
        "yaw rate (r)": [], 
        "yaw rate (r`)": [],
        "Time": [],
        "theta 1": [],
        "theta 1`": [],
        "theta 2": [],
        "theta 2`": [],
    }
    
    # Simulation Initialization
    X_0 = np.array([0., 0., 0., 0., 0., 0.]).reshape((-1, 1))
    t_0 = 0
    t = t_0
    T = 180.0
    dt = 0.016
    U = np.array(get_force(t_0)).reshape((-1, 1))
    state_time = []
    state_integrator = RK4_Integrator(X_0, t_0, T, dt, dx)
    
    # AEKF Init
    num_states = X_0.shape[0]
    x, t = state_integrator.step(U)
    x_hat = np.array([10., 10., 20., 10., 20., 10.]).reshape((-1, 1))
    theta = np.array(get_theta(t_0)).reshape((2, 1))
    theta_hat = np.zeros((2, 1)) # unclear
    P_plus = np.identity(num_states)
    Upsilon = 0 * B()
    S = 0.01 * np.identity(2)
    lamda = 0.997
    a = 1
    
    # AEKF Updatable params
    A = np.identity(6)
    QF = np.diag([0.0001 for _ in range(num_states)])
    RF = np.diag([0.0001 for _ in range(num_states)])
    C = np.array([
        [1., 0., 0., 0., 0., 0.],
        [0., 1., 0., 0., 0., 0.],
        [0., 0., 1., 0., 0., 0.],
        [0., 0., 0., 1., 0., 0.],
        [0., 0., 0., 0., 1., 0.],
        [0., 0., 0., 0., 0., 1.]
    ])
    In = np.identity(num_states)
    Phi = -B() @ np.diag(U.reshape(-1)) * dt # hax dt multiplied with B
    
    # logging
    log_data(output, x, None, t, theta, None)

    while True:
        F = (
            A + 
            dt * Jf(x_hat[0][0], x_hat[1][0], x_hat[2][0], x_hat[3][0], x_hat[4][0], x_hat[5][0])
        )

        # This following block should be repositioned and should be part of initialization like x_hat
        y = C @ x # not sure
        y_tilda = y - C @ x_hat

        P_minus = F @ P_plus @ F.T + QF
        Sigma = C @ P_minus @ C.T + RF
        K = P_minus @ C.T @ inv(Sigma)
        P_plus = (In - (K @ C)) @ inv(P_minus)

        QF = a * QF + (1-a) * (K @ y_tilda @ y_tilda.T @ K.T)
        RF = a * RF + (1-a) * ((y_tilda @ y_tilda.T) + (C @ P_minus @ C.T))

        Omega = (C @ F @ Upsilon) + (C @ Phi)       
        Upsilon = ((In - (K @ C)) @ F @ Upsilon) + (In - (K @ C)) @ Phi
        Lamda = inv((lamda * Sigma) + (Omega @ S @ Omega.T))
        Gamma = S @ (Omega.T @ Lamda)
        S = (S / lamda) - ((S @ Omega.T @ Lamda @ Omega @ S) / lamda)
        
        x_hat = (
            (A @ x_hat) + 
            fx(x) * dt +
            (B() @ U) * dt +
            Phi @ theta_hat + 
            K @ y_tilda + 
            Upsilon @ Gamma @ y_tilda
        )
        theta_hat = theta_hat + Gamma @ y_tilda
        
        #Utility & state updates
        U = np.array(get_force(t + dt)).reshape((-1, 1))
        result = state_integrator.step(U)
        
        if result is None:
            break
        
        x, t = result
        x += Phi @ theta # hax for update
        
        
        log_data(output, x, x_hat, t, theta, theta_hat)
        
        # update theta based on table
        theta = np.array(get_theta(t)).reshape((2, 1))

    return output

output = run()