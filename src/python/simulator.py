import numpy as np
from numpy.linalg import inv
from js import window

force_x = window.simulator_input.force.x
force_y = window.simulator_input.force.y

def rk4_integrator(x_0, t_0, t_n, dt, dx, u):
    x = x_0
    t = t_0
    
    yield (x, t)
    
    while t <= t_n:
        # eval x_k+1 using x_k and t_k
        k1 = dx(x, t, u)
        k2 = dx(x + dt * k1 / 2, t + dt / 2, u)
        k3 = dx(x + dt * k2 / 2, t + dt / 2, u)
        k4 = dx(x + dt * k3, t + dt, u)
        
        x = x + dt * (k1 + 2*k2 + 2*k3 + k4) * (1/6)
        
        # t increament to t_k+1
        t = t + dt
        
        yield (x, t)

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

def x(x, y, r, u, v, sai):
    return np.array([x, y, r, u, v, sai]).T

def C(V):
    u = V[0]
    v = V[1]
    r = V[2]
    c13 = -33.8*v -(6.2+6.2)*r/2
    c23 = 25.8*u
    return np.array([
        [0, 0, c13],
        [0, 0, c23],
        [-c13, -c23, 0]
    ])

def D(V):
    u = V[0]
    v = V[1]
    r = V[2]
    return -np.array([
        [-12 - 2.1 * abs(u), 0, 0],
        [0, -17 - 4.5 * abs(v) , -0.2],
        [0, -0.5, -0.5 - 0.1 * abs(r)]
    ])

def R(sai):
    return np.array([
        [np.cos(sai), -np.sin(sai), 0],
        [np.sin(sai), np.cos(sai), 0],
        [0, 0, 1]
    ])

def fx(V, sai):
    a = R(sai)@V
    b = -Minv@(C(V) + D(V))@V
    c = np.array([a, b]).reshape(-1)
    return c


def B():
    a = np.array([
        [0, 0],
        [0, 0],
        [0, 0]
    ])
    b = Minv@Bt
    c = np.concatenate((a, b), axis=0)
    return c

# X = [x, y, r, u, v, sai]
def dx(X, t = None, U = np.array([0, 0])):
    V = X[3:]
    sai = X[2]
    return fx(V, sai) + B()@U

'''
initial conditions
x = 0
y = 0
sai = 90deg clockwise with y-axis
u = 0
v = 0
r = 0

F_u = 2
F_v = 1
'''
X_0 = np.array([0, 0, 0, 0, 0, 0])
U = [force_x, force_y] 

t_0 = 0
T = 60
dt = 0.016

state_time = []
state_integrator = rk4_integrator(X_0, t_0, T, dt, dx, np.array(U))
for x, t in state_integrator:
    # state_time.append({"Position (X)": x[0], "Position (Y)": x[1], "yaw rate (r)": x[2], "Vel (u)": x[3], "Vel (v)": x[4], "Position (Sai)": x[5], "Time": t})
    state_time.extend([
        x[0],
        x[1],
        x[2]
    ])

# print(f"{state_time[-3]} {state_time[-2]} {state_time[-1]} {len(state_time) / 3}")
index_skip = 3