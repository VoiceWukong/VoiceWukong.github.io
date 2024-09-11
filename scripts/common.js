const btnMethod = document.getElementById("method");
const btnManipulation = document.getElementById("manipulation");
const metricsDiv = document.getElementById('Metrics');
const btnAcc = document.getElementById("accuracy");
const btnFscore = document.getElementById("f1_score");
const btnFar = document.getElementById("falseacceptancerate");
const btnFrr = document.getElementById("falserejectionrate");
const btnUser = document.getElementById("userstudy");
const Level = document.getElementById("Level");

btnMethod.checked = true;
function flatten(data) {
  const results = [];
  for (const [key, value] of Object.entries(data)) {
    for (const row of value) {
      const {
        Context: context,
        Method: method,
        Model: model,
        Pass_at_1: score,
      } = row;

      let result = results.find(
        (r) => r.context === context && r.method === method && r.model === model
      );
      if (!result) {
        result = { context, method, model };
        results.push(result);
      }

      result[key] = (score * 100).toFixed(1);
    }
  }
  return results;
}



function flattenauc(data) {
  const results = [];
  for (const [key, value] of Object.entries(data)) {
    for (const row of value) {
      const {
        ENAUC: enauc,
        ENEER: eneer,
        CNEER: cneer,
        CNAUC: cnauc,
        Model: model,
      } = row;

      let result = results.find(
        (r) => r.enauc === enauc && r.eneer === eneer && r.model === model && r.cneer === cneer && r.cnauc === cnauc
      );
      if (!result) {
        result = { enauc,eneer,cneer,cnauc, model };
        results.push(result);
      }

    }
  }
  return results;
}



function flattlevel(data) {
  const results = [];
  for (const [key, value] of Object.entries(data)) {
    for (const row of value) {
      const {
        ENLevel: enlevel,
        ZHLevel: zhlevel,
        ENFAR: enfar,
        ZHFAR: zhfar,
        Model: model,
      } = row;

      let result = results.find(
        (r) => r.enlevel === enlevel && r.zhlevel === zhlevel && r.enfar === enfar && r.zhfar === zhfar && r.model === model);
      if (!result) {
        result = { enlevel,zhlevel,enfar,zhfar, model };
        results.push(result);
      }


    }
  }
  return results;
}


function flattenacc(data) {
  const results = [];
  for (const [key, value] of Object.entries(data)) {
    for (const row of value) {
      const {
        ENACC: enacc,
        ENF1: enf1,
        ENFAR: enfar,
        ENFRR: enfrr,
        CNACC: cnacc,
        CNF1: cnf1,
        CNFAR: cnfar,
        CNFRR: cnfrr,
        Model: model,
        Variant: variant,
      } = row;

      let result = results.find(
        (r) => r.enacc === enacc && r.enf1 === enf1 && r.enfar === enfar && r.enfrr === enfrr && r.cnacc === cnacc && r.cnf1 === cnf1 && r.cnfar === cnfar && r.cnfrr === cnfrr && r.model === model && r.variant === variant
      );
      if (!result) {
        result = { enacc,enf1,enfar,enfrr,cnacc,cnf1,cnfar,cnfrr, model, variant };
        results.push(result);
      }

    }
  }
  return results;
}




