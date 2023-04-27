export function generateTrails (data){
  const SKIP_FACTOR = 25;
  const SCALE_FACTOR = 100;

  let position = [];
  const estimatedPosition = [];
  const length = data.get("Time").length;

  for (let i = SKIP_FACTOR * 2; i < length; i += 2 * SKIP_FACTOR) {
    position.push([
      [
        data.get("Position (X)")[i - 2 * SKIP_FACTOR] * SCALE_FACTOR,
        data.get("Position (Y)")[i - 2 * SKIP_FACTOR] * SCALE_FACTOR,
      ],
      [
        data.get("Position (X)")[i - SKIP_FACTOR] * SCALE_FACTOR,
        data.get("Position (Y)")[i - SKIP_FACTOR] * SCALE_FACTOR,
      ],
      [
        data.get("Position (X)")[i] * SCALE_FACTOR,
        data.get("Position (Y)")[i] * SCALE_FACTOR,
      ],
    ]);

    estimatedPosition.push([
      [
        data.get("Position (X`)")[i - 2 * SKIP_FACTOR] * SCALE_FACTOR,
        data.get("Position (Y`)")[i - 2 * SKIP_FACTOR] * SCALE_FACTOR,
      ],
      [
        data.get("Position (X`)")[i - SKIP_FACTOR] * SCALE_FACTOR,
        data.get("Position (Y`)")[i - SKIP_FACTOR] * SCALE_FACTOR,
      ],
      [
        data.get("Position (X`)")[i] * SCALE_FACTOR,
        data.get("Position (Y`)")[i] * SCALE_FACTOR,
      ],
    ]);
  }

  return { position, estimatedPosition };
};

export function processMeasurements(data, simplify = true){
  let result = [];
  const length = data.get("Time").length;

  for (let i = 0; i < length; i += simplify ? 25 : 1) {
    result.push({
      time: data.get("Time")[i],
      value: data.get("Position (X)")[i],
      category: "x",
    });
    result.push({
      time: data.get("Time")[i],
      value: data.get("Position (Y)")[i],
      category: "y",
    });
    result.push({
      time: data.get("Time")[i],
      value: data.get("Position (Sai)")[i],
      category: "Ψ",
    });
    result.push({
      time: data.get("Time")[i],
      value: data.get("Vel (u)")[i],
      category: "u",
    });
    result.push({
      time: data.get("Time")[i],
      value: data.get("Vel (v)")[i],
      category: "v",
    });
    result.push({
      time: data.get("Time")[i],
      value: data.get("yaw rate (r)")[i],
      category: "r",
    });
  }

  return result;
};

export function processEstimateGlobal(data, simplify = true) {
  let result = [];
  const length = data.get("Time").length;

  for (let i = 0; i < length; i += simplify ? 25 : 1) {
    result.push({
      time: data.get("Time")[i],
      value: data.get("Position (X)")[i],
      category: "x",
    });
    result.push({
      time: data.get("Time")[i],
      value: data.get("Position (Y)")[i],
      category: "y",
    });
    result.push({
      time: data.get("Time")[i],
      value: data.get("Position (Sai)")[i],
      category: "Ψ",
    });
    result.push({
      time: data.get("Time")[i],
      value: data.get("Position (X`)")[i],
      category: "x`",
    });
    result.push({
      time: data.get("Time")[i],
      value: data.get("Position (Y`)")[i],
      category: "y`",
    });
    result.push({
      time: data.get("Time")[i],
      value: data.get("Position (Sai`)")[i],
      category: "Ψ`",
    });
  }

  return result;
};

export function processEstimateLocal(data, simplify = true) {
  let result = [];
  const length = data.get("Time").length;

  for (let i = 0; i < length; i += simplify ? 25 : 1) {
    result.push({
      time: data.get("Time")[i],
      value: data.get("Vel (u)")[i],
      category: "u",
    });
    result.push({
      time: data.get("Time")[i],
      value: data.get("Vel (v)")[i],
      category: "v",
    });
    result.push({
      time: data.get("Time")[i],
      value: data.get("yaw rate (r)")[i],
      category: "r",
    });
    result.push({
      time: data.get("Time")[i],
      value: data.get("Vel (u`)")[i],
      category: "u`",
    });
    result.push({
      time: data.get("Time")[i],
      value: data.get("Vel (v`)")[i],
      category: "v`",
    });
    result.push({
      time: data.get("Time")[i],
      value: data.get("yaw rate (r`)")[i],
      category: "r`",
    });
  }

  return result;
};

export function processEstimateFault(data, simplify = true) {
  let result = [];
  const length = data.get("Time").length;

  for (let i = 0; i < length; i += simplify ? 25 : 1) {
    result.push({
      time: data.get("Time")[i],
      value: data.get("theta 1")[i],
      category: "θ 1",
    });
    result.push({
      time: data.get("Time")[i],
      value: data.get("theta 2")[i],
      category: "θ 2",
    });
    result.push({
      time: data.get("Time")[i],
      value: data.get("theta 1`")[i],
      category: "θ 1`",
    });
    result.push({
      time: data.get("Time")[i],
      value: data.get("theta 2`")[i],
      category: "θ 2`",
    });
  }

  return result;
};
