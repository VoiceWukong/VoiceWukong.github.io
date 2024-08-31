const tableEnglish = document.getElementById("english-result");
const tableChinese = document.getElementById("chinese-result");

async function displayData1(data, metric, metricName,metricName2) {
  const models = await fetch("models.json").then((resp) => resp.json());
  const flattened = flatten(data);
  [...document.querySelectorAll("[data-metric1]")].forEach(
    (el) => (el.innerHTML = metricName)
  );
  [...document.querySelectorAll("[data-metric2]")].forEach(
    (el) => (el.innerHTML = metricName2)
  );
  [...document.querySelectorAll("[data-metric3]")].forEach(
    (el) => (el.innerHTML = metricName3)
  );

  function display(el, cols, sort_key) {

    flattened.sort((a, b) => b[sort_key] - a[sort_key]);

    const tbody = el.querySelector("tbody");
    tbody.innerHTML = "";
    for (const [index, row] of flattened.entries()) {
      const tr = document.createElement("tr");
      const tdIndex = document.createElement("td");
      tdIndex.textContent = index + 1;
      tr.appendChild(tdIndex);

      for (const col of ["model", metric, ...cols]) {
        const td = document.createElement("td");
        if (col === "model") {
          const anchor = document.createElement("a");
          anchor.href = models.find((m) => m.model === row.model).link;
          anchor.innerHTML = row.model;
          td.appendChild(anchor);
        } else {
          td.innerHTML = row[col];
        }
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }
  }

  display(
    tableEnglish,
    ["completion", "compilation_class_wise", "pass_class_wise"],
    "pass_class_wise"
  );
  display(
    tableChinese,
    ["compilation_test_wise", "pass_test_wise"],
    "pass_test_wise"
  );
}


async function displayData(data, metricName, metricName2) {
  const models = await fetch("models.json").then((resp) => resp.json());
  const flattened = flattenauc(data);

  [...document.querySelectorAll("[data-metric1]")].forEach(
    (el) => (el.innerHTML = metricName)
  );
  [...document.querySelectorAll("[data-metric2]")].forEach(
    (el) => (el.innerHTML = metricName2)
  );

  function display(el, cols, sort_key) {
    flattened.sort((a, b) => b[sort_key] - a[sort_key]);

    const thead = el.querySelector("thead");
    const tbody = el.querySelector("tbody");
    thead.innerHTML = "";
    tbody.innerHTML = "";

    // 添加表头标题
    const headerRow = document.createElement("tr");
    const thIndex = document.createElement("th");
    thIndex.textContent = "Rank";
    headerRow.appendChild(thIndex);

    for (const col of ["model", ...cols]) {
      const th = document.createElement("th");
      if (col === "model") {
        th.textContent = "Model";
      } else if (col.includes("auc")) {
        th.textContent = metricName;
      } else {
        th.textContent = metricName2;
      }
      headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);

    for (const [index, row] of flattened.entries()) {
      const tr = document.createElement("tr");
      const tdIndex = document.createElement("td");
      tdIndex.textContent = index + 1;
      tr.appendChild(tdIndex);

      for (const col of ["model", ...cols]) {
        const td = document.createElement("td");
        if (col === "model") {
          const anchor = document.createElement("a");
          const modelData = models.find((m) => m.model === row.model);
          if (modelData && modelData.link) {
            anchor.href = modelData.link;
            anchor.innerHTML = row.model;
            td.appendChild(anchor);
          } else {
            td.innerHTML = row.model;
            console.log(`No link found for model ${row.model}`);
          }
        } else {
          td.innerHTML = row[col];
        }
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }
  }

  function clearTable(el) {
    const thead = el.querySelector("thead");
    const tbody = el.querySelector("tbody");
    thead.innerHTML = "";
    tbody.innerHTML = "";
  }

  // 清除表格内容
  clearTable(tableEnglish);
  clearTable(tableChinese);

  // 重新渲染表格内容
  display(tableEnglish, ["enauc", "eneer"], "enauc");
  display(tableChinese, ["cnauc", "cneer"], "cnauc");
}



async function displayDataacc(data, metric1, metric2, metricName, metricName2) {
  const models = await fetch("models.json").then((resp) => resp.json());
  let flattened;
  if (metric1.includes('zh')) {
    // console.log('yandoit')
    flattened = flattlevel(data)

  }
  else {
    flattened = flattenacc(data);
  }
  [...document.querySelectorAll("[data-metric1]")].forEach(
    (el) => (el.innerHTML = metricName)
  );
  [...document.querySelectorAll("[data-metric2]")].forEach(
    (el) => (el.innerHTML = metricName2)
  );

  function display(el, cols, sort_key, filter = {}) {
    if (sort_key.includes('far') || sort_key.includes('frr')) {
      flattened.sort((a, b) => a[sort_key] - b[sort_key]);
    }
    else {
      flattened.sort((a, b) => b[sort_key] - a[sort_key]);
    }


    const tbody = el.querySelector("tbody");
    tbody.innerHTML = "";

    // 根据筛选条件过滤数据
    const filteredData = flattened.filter(row => {
      return Object.keys(filter).every(key => row[key] === filter[key]);
    });

    for (const [index, row] of filteredData.entries()) {
      const tr = document.createElement("tr");
      const tdIndex = document.createElement("td");
      tdIndex.textContent = index + 1;
      tr.appendChild(tdIndex);

      for (const col of ["model", ...cols]) {
        const td = document.createElement("td");
        if (col === "model") {
          const modelData = models.find((m) => m.model === row.model);
          if (modelData && modelData.link) {
            const anchor = document.createElement("a");
            anchor.href = modelData.link;
            anchor.innerHTML = row.model;
            td.appendChild(anchor);
          } else {
            td.innerHTML = row.model;
            console.log(`No link found for model ${row.model}`);
          }
        } else {
          td.innerHTML = row[col];
        }
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }
  }

  function setupTable(el, cols, sort_key) {
    const thead = el.querySelector("thead");
    const tbody = el.querySelector("tbody");

    // 清除之前的设置
    thead.innerHTML = "";
    tbody.innerHTML = "";

    const headerRow = document.createElement("tr");

    // 添加索引列头
    const thIndex = document.createElement("th");
    thIndex.textContent = "Rank";
    headerRow.appendChild(thIndex);

    // 添加其他列头并设置下拉框
    for (const [i, col] of ["model", ...cols].entries()) {
      const th = document.createElement("th");
      if (col === "model") {
        th.textContent = "Model";
      } else if (col === 'variant' || col.includes('level')) {
        th.textContent = metricName;
      } else {
        th.textContent = metricName2;
      }

      if (i === 0 || i === 1) { // 仅为第一列和第二列添加下拉框
        const select = document.createElement("select");
        select.innerHTML = `<option value="">All</option>`;

        // 获取列的唯一值
        const uniqueValues = [...new Set(flattened.map(row => row[col]))];
        uniqueValues.forEach(value => {
          const option = document.createElement("option");
          option.value = value;
          option.textContent = value;
          select.appendChild(option);
        });

        select.addEventListener("change", () => {
          const filter = {};
          if (select.value) {
            filter[col] = select.value;
          }
          display(el, cols, sort_key, filter);
        });

        th.appendChild(select);
      }

      headerRow.appendChild(th);
    }

    thead.appendChild(headerRow);

    // 初始显示所有内容
    display(el, cols, sort_key);
  }
  function clearTable(el) {
    const thead = el.querySelector("thead");
    const tbody = el.querySelector("tbody");
    thead.innerHTML = "";
    tbody.innerHTML = "";
  }

  // 清除表格内容
  clearTable(tableEnglish);
  clearTable(tableChinese);
  // 调用 setupTable 函数来初始化表格
  if (metric1.includes('zh')) {
    setupTable(tableChinese, ["zhlevel", metric1], metric1);
    setupTable(tableEnglish, ["enlevel", metric2], metric2);
  }
  else {
    setupTable(tableChinese, ["variant", metric1], metric1);
    setupTable(tableEnglish, ["variant", metric2], metric2);
  }
}
// btnMethod.addEventListener("click", () => {
//   fetch("data/data_method.json")
//     .then((resp) => resp.json())
//     .then((data) => {
//       displayData(data, "method", "Method",'ccc','ddd');
//     });
// });

btnMethod.addEventListener("click", () => {
  fetch("data/auc_eer_dict.json ")
    .then((resp) => resp.json())
    .then((data) => {
      displayData(data,'AUC','EER (%)');
    });
});
const ENACC = "enacc"
const CNACC = "cnacc"
btnAcc.addEventListener("click", () => {
  fetch("data/manipulation_dict.json")
    .then((resp) => resp.json())
    .then((data) => {
      displayDataacc(data, CNACC,ENACC,"Variant", "ACC (%)");
    });
});
const ENF1 = "enf1"
const CNF1 = "cnf1"

btnFscore.addEventListener("click", () => {
  fetch("data/manipulation_dict.json")
    .then((resp) => resp.json())
    .then((data) => {
      displayDataacc(data,CNF1,ENF1, "Variant", "F1 Score (%)");
    });
});

const ENFAR = "enfar"
const CNFAR = "cnfar"
btnFar.addEventListener("click", () => {
  fetch("data/manipulation_dict.json")
    .then((resp) => resp.json())
    .then((data) => {
      displayDataacc(data, CNFAR, ENFAR, "Variant", "FAR (%)");
    });
});
const ENFRR = "enfrr"
const CNFRR = "cnfrr"
btnFrr.addEventListener("click", () => {
  fetch("data/manipulation_dict.json")
    .then((resp) => resp.json())
    .then((data) => {
      displayDataacc(data, CNFRR, ENFRR, "Variant", "FRR (%)");
    });
});
const ZHFAR = "zhfar"
btnUser.addEventListener("click", () => {
  fetch("data/study_dict.json")
    .then((resp) => resp.json())
    .then((data) => {
      displayDataacc(data, ZHFAR,ENFAR, "Level", "FAR (%)");
    });
});
  
// btnManipulation.addEventListener("click", () => {
//   fetch("data/data_context.json")
//     .then((resp) => resp.json())
//     .then((data) => {
//       displayData(data, "context", "Context",'ccc','ddd');
//     });
// // });
// btnManipulation.addEventListener("click", () => {
//   fetch("data/auc_eer_dict.json")
//     .then((resp) => resp.json())
//     .then((data) => {
//       displayData(data,'AUC','EER (%)');
//     });
// });

// btnIncrOrder.addEventListener("click", () => {
//   fetch("data/data_incr-order.json")
//     .then((resp) => resp.json())
//     .then((data) => {
//       displayData(data, "method", "Method");
//     });
// });
function toggleMetricsDisplay() {
  if (btnManipulation.checked) {
    metricsDiv.style.display = 'block';
    btnAcc.checked = true;
    Notice1.style.display = 'block';
    fetch("data/manipulation_dict.json")
      .then((resp) => resp.json())
      .then((data) => {
        displayDataacc(data, CNACC, ENACC, 'Variant', 'ACC (%)');
      });
  } else {
    Notice1.style.display = 'none';
    metricsDiv.style.display = 'none';
  }
  if (btnUser.checked) {
    Notice2.style.display = 'block'
  }
  else {
    Notice2.style.display = 'none'
  }
}
// Initial check
toggleMetricsDisplay();

// Add event listeners to all radio buttons in the Overall group
const overallRadios = document.querySelectorAll('#Overall input[name="btnradio"]');
overallRadios.forEach(radio => {
  radio.addEventListener('change', toggleMetricsDisplay);
});


fetch("data/auc_eer_dict.json")
  .then((resp) => resp.json())
  .then((data) => {
    displayData(data,'AUC','EER (%)');
  });

