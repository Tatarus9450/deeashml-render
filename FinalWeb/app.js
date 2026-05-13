const tabs = [...document.querySelectorAll(".tab-link")];
const panels = [...document.querySelectorAll(".tab-panel")];
const backToTop = document.querySelector(".back-to-top");
const form = document.querySelector("#fitForm");
const errorText = document.querySelector("#errorText");
const neverUsed = document.querySelector("#neverUsed");
const methodInputs = [...document.querySelectorAll('input[name^="product_"]')];
const progressFill = document.querySelector("#progressFill");
const progressText = document.querySelector("#progressText");
const resultCard = document.querySelector("#resultCard");
const finalData = window.DEEASH_FINAL_DATA || {};
const alertSound = new Audio("assets/alrt_sparkle.mp3");

alertSound.preload = "auto";
alertSound.volume = 0.72;

const alertOptions = {
  customClass: {
    popup: "deeash-alert",
    confirmButton: "deeash-confirm"
  },
  confirmButtonText: "ตกลง",
  buttonsStyling: false
};

const metricLabels = {
  accuracy: "Accuracy",
  precision: "Precision",
  recall: "Recall",
  f1: "F1-Score"
};

const colorMap = {
  blue: "#5e7bea",
  purple: "#854fb1",
  pink: "#e77cec",
  red: "#f65068",
  green: "#43bd72",
  cyan: "#1fbec9",
  mint: "#8fe1d9",
  gold: "#d7b85b"
};

const personaThai = {
  "Confidence Seeker": {
    text: "กลุ่มหลักของ DeeAsh ให้ความสำคัญกับความมั่นใจก่อนออกไปพบผู้คน เหมาะกับข้อความที่ย้ำผลลัพธ์ชัด ใช้ง่าย และช่วยให้ดูพร้อมในเวลาสั้น",
    chips: ["เน้นความมั่นใจ", "ชอบผลลัพธ์ชัด", "เหมาะกับรีวิว Before/After"]
  },
  "Budget-Smart Buyer": {
    text: "กลุ่มนี้สนใจความคุ้มค่าและลดความเสี่ยงก่อนลองซื้อ ควรใช้โปรโมชัน รีวิวจริง และข้อความที่อธิบายว่าจ่ายแล้วได้ประโยชน์อะไรชัดเจน",
    chips: ["ไวต่อราคา", "ต้องการความคุ้มค่า", "เหมาะกับ Marketplace"]
  }
};

function activateTab(tabId) {
  const target = panels.some((panel) => panel.id === tabId) ? tabId : "home";
  tabs.forEach((tab) => tab.classList.toggle("is-active", tab.dataset.tab === target));
  panels.forEach((panel) => panel.classList.toggle("is-active", panel.id === target));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

tabs.forEach((tab) => {
  tab.addEventListener("click", (event) => {
    event.preventDefault();
    const tabId = tab.dataset.tab;
    history.pushState(null, "", `#${tabId}`);
    activateTab(tabId);
  });
});

window.addEventListener("popstate", () => {
  activateTab(location.hash.replace("#", "") || "home");
});

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("is-visible", window.scrollY > 520);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

function formPayload() {
  const data = new FormData(form);
  const hasNeverUsed = data.has("product_never_used");
  return {
    gender: data.get("gender"),
    age_group: data.get("age_group"),
    region: data.get("region"),
    product_shampoo_color: data.has("product_shampoo_color") && !hasNeverUsed,
    product_mixing_cream: data.has("product_mixing_cream") && !hasNeverUsed,
    product_sachet_cream: data.has("product_sachet_cream") && !hasNeverUsed,
    product_never_used: hasNeverUsed,
    moment: data.get("moment"),
    concern: data.get("concern"),
    need: data.get("need")
  };
}

function completedSteps() {
  const data = new FormData(form);
  const methodDone = ["product_shampoo_color", "product_mixing_cream", "product_sachet_cream", "product_never_used"]
    .some((name) => data.has(name));
  return [
    Boolean(data.get("gender")),
    Boolean(data.get("age_group")),
    Boolean(data.get("region")),
    methodDone,
    Boolean(data.get("moment")),
    Boolean(data.get("concern")),
    Boolean(data.get("need"))
  ].filter(Boolean).length;
}

function updateProgress() {
  if (!progressText || !progressFill || !form) return;
  const count = completedSteps();
  progressText.textContent = `${count}/7`;
  progressFill.style.width = `${Math.round((count / 7) * 100)}%`;
}

function animateScore(score) {
  const scoreText = document.querySelector("#scoreText");
  const scoreRing = document.querySelector("#scoreRing");
  const end = Math.round(Number(score) || 0);
  const duration = 650;
  const startTime = performance.now();

  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(end * eased);
    scoreText.textContent = `${value}/100`;
    scoreRing.style.setProperty("--score", value);
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

function rewardWords(result) {
  const score = Number(result.score) || 0;
  if (score >= 75) return [result.level, "ดีจังให้ดาวทอง", "พร้อมออกงาน", "เริ่ดด!!"];
  if (score >= 50) return [result.level, "มีแววเข้ากัน", "ลองใช้ก่อนเจอคน", "ใช้ง่ายไว"];
  if (score >= 25) return [result.level, "เหมาะบางวัน", "ใช้ตอนจำเป็น", "ค่อยๆลอง"];
  return [result.level, "ยังเบาๆ", "เก็บเป็นตัวเลือก", "รอจังหวะตามโอกาส"];
}

function renderRewards(result) {
  const rewardIds = ["rewardLevel", "rewardMood", "rewardAction", "rewardKeyword"];
  const words = rewardWords(result);
  rewardIds.forEach((id, index) => {
    const reward = document.querySelector(`#${id}`);
    if (!reward) return;
    reward.textContent = words[index];
    reward.classList.remove("is-live");
    void reward.offsetWidth;
    reward.classList.add("is-live");
  });
}

function resetRewards() {
  const defaults = ["รอคะแนน", "เปิดการ์ดก่อน", "ดีจังรออยู่", "Fit Score"];
  ["rewardLevel", "rewardMood", "rewardAction", "rewardKeyword"].forEach((id, index) => {
    const reward = document.querySelector(`#${id}`);
    if (!reward) return;
    reward.textContent = defaults[index];
    reward.classList.remove("is-live");
  });
}

function renderResult(result) {
  animateScore(result.score);
  document.querySelector("#levelText").textContent = result.level;
  document.querySelector("#personaText").textContent = result.persona;
  document.querySelector("#recommendationText").textContent = result.recommendation;
  document.querySelector("#messageText").textContent = result.marketing_message;
  document.querySelector("#runtimeModelText").textContent = `โมเดลที่ใช้: ${result.model_name || "ไม่ระบุ"}`;
  renderRewards(result);
  resultCard?.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function resetResult() {
  document.querySelector("#scoreRing").style.setProperty("--score", 0);
  document.querySelector("#scoreText").textContent = "--";
  document.querySelector("#levelText").textContent = "รอคำตอบ";
  document.querySelector("#personaText").textContent = "ตอบคำถามเพื่อดูกลุ่มบุคลิก";
  document.querySelector("#recommendationText").textContent = "ระบบจะเปิดการ์ดผลลัพธ์หลังตอบครบ";
  document.querySelector("#messageText").textContent = "กด “เปิดการ์ดผลลัพธ์” แล้วให้ดีจังจังช่วยลุ้นคะแนน";
  document.querySelector("#runtimeModelText").textContent = "โมเดลที่ใช้: รอผลลัพธ์";
  resetRewards();
  updateProgress();
}

function playAlertSound() {
  try {
    alertSound.currentTime = 0;
    const playPromise = alertSound.play();
    if (playPromise) playPromise.catch(() => {});
  } catch (error) {
    // Browser autoplay policy can block sound if the popup was not triggered by a user action.
  }
}

function showAlert(options) {
  if (options.icon === "success") playAlertSound();
  if (window.Swal) return Swal.fire({ ...alertOptions, ...options });
  if (options.text) window.alert(options.text);
  return Promise.resolve();
}

async function requestPrediction(payload) {
  return requestBackendPrediction(payload);
}

async function requestBackendPrediction(payload) {
  const response = await fetch("/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  const text = await response.text();
  let result = null;
  try {
    result = text ? JSON.parse(text) : null;
  } catch (error) {
    throw new Error("Prediction backend did not return JSON");
  }
  if (!response.ok || !result || result.error) {
    throw new Error(result?.error || "Prediction backend failed");
  }
  return result;
}

function renderModelPerformance() {
  const target = document.querySelector("#modelPerformanceGrid");
  if (!target || !finalData.modelPerformance) return;
  target.innerHTML = finalData.modelPerformance.map((model) => `
    <article class="model-card" data-theme="${model.theme}">
      <div class="model-title">
        <span class="model-icon">${model.name.split(" ").map((word) => word[0]).join("").slice(0, 2)}</span>
        <div>
          <h3>${model.name}</h3>
          <p>ผลการทดสอบโมเดล</p>
        </div>
      </div>
      <div class="metric-table">
        <div class="metric-row metric-head"><span>Metric</span><span>Test</span><span>Train</span></div>
        ${Object.entries(metricLabels).map(([key, label]) => `
          <div class="metric-row">
            <span>${label}</span>
            <strong>${Number(model.test[key]).toFixed(2)}</strong>
            <strong>${Number(model.train[key]).toFixed(2)}</strong>
          </div>
        `).join("")}
      </div>
    </article>
  `).join("");
}

function renderSupervisedSummary() {
  const supervised = finalData.supervised;
  if (!supervised) return;

  const heroStats = document.querySelector("#heroStats");
  if (heroStats && supervised.heroStats) {
    heroStats.innerHTML = supervised.heroStats.map((stat) => `
      <span><strong>${stat.value}</strong> ${stat.label}</span>
    `).join("");
  }

  const bestModel = supervised.bestModel;
  if (bestModel) {
    const title = document.querySelector("#bestModelTitle");
    const description = document.querySelector("#bestModelDescription");
    const stats = document.querySelector("#bestModelStats");
    if (title) title.textContent = bestModel.title;
    if (description) description.textContent = bestModel.description;
    if (stats) {
      stats.innerHTML = bestModel.stats.map((stat) => `
        <span><strong>${stat.value}</strong> ${stat.label}</span>
      `).join("");
    }
  }

  const metricStrip = document.querySelector("#supervisedMetricStrip");
  if (metricStrip && supervised.metricStrip) {
    metricStrip.innerHTML = supervised.metricStrip.map((metric) => `
      <article><span>${metric.label}</span><strong>${metric.value}</strong></article>
    `).join("");
  }
}

function renderBars(selector, rows, options = {}) {
  const target = document.querySelector(selector);
  if (!target || !rows) return;
  const max = rows.reduce((top, row) => Math.max(top, Number(row.rawValue ?? row.value) || 0), 1);
  target.innerHTML = rows.map((row, index) => {
    const rawValue = Number(row.rawValue ?? row.value) || 0;
    const displayValue = row.displayValue ?? row.value;
    const width = options.usePercent ? row.percent : (rawValue / max) * 100;
    const color = row.color || Object.keys(colorMap)[index % Object.keys(colorMap).length];
    return `
      <div class="bar-row">
        <span title="${row.label}">${row.label}</span>
        <span class="bar-track"><span class="bar-fill ${color}" style="--value:${Math.max(4, width)}%"></span></span>
        <strong>${displayValue}</strong>
      </div>
    `;
  }).join("");
}

function renderDonut(donutSelector, totalSelector, legendSelector, rows) {
  const donut = document.querySelector(donutSelector);
  const total = document.querySelector(totalSelector);
  const legend = document.querySelector(legendSelector);
  if (!donut || !total || !legend || !rows) return;
  const sum = rows.reduce((acc, row) => acc + Number(row.value), 0);
  const first = sum ? (rows[0].value / sum) * 100 : 0;
  const second = sum && rows[1] ? first + (rows[1].value / sum) * 100 : first;
  donut.style.setProperty("--a", `${first}%`);
  donut.style.setProperty("--b", `${second}%`);
  total.textContent = sum;
  legend.innerHTML = rows.map((row, index) => {
    const color = row.color || Object.keys(colorMap)[index % Object.keys(colorMap).length];
    const pct = sum ? Math.round((row.value / sum) * 100) : 0;
    return `
      <div class="legend-item">
        <span class="legend-dot ${color}"></span>
        <span>${row.label}</span>
        <span>${row.value} (${pct}%)</span>
      </div>
    `;
  }).join("");
}

function renderSegments() {
  if (!finalData.segments) return;
  renderBars("#segmentShareBars", finalData.segments.map((segment, index) => ({
    label: segment.name,
    value: segment.count,
    displayValue: `${segment.count} คน`,
    percent: segment.share,
    color: index === 0 ? "green" : "gold"
  })), { usePercent: true });

  const personaGrid = document.querySelector("#personaGrid");
  if (!personaGrid) return;
  personaGrid.innerHTML = finalData.segments.map((segment, index) => {
    const color = index === 0 ? "green" : "gold";
    const thai = personaThai[segment.name] || { text: "กลุ่มลูกค้าที่มีลักษณะเด่นจากข้อมูลแบบสอบถาม DeeAsh", chips: [] };
    return `
      <article class="persona-card" style="--bar-color:${colorMap[color]}">
        <span class="cluster-label">CLUSTER ${segment.cluster}</span>
        <h3>${segment.name}</h3>
        <p class="persona-share">${segment.share}% (${segment.count} คน)</p>
        <p class="persona-thai">${thai.text}</p>
        <div class="persona-chips">
          ${thai.chips.map((chip) => `<span>${chip}</span>`).join("")}
        </div>
        <div class="feature-box">
          <h4>Feature Importance</h4>
          <div class="bar-list dense">
            ${segment.features.map((feature) => `
              <div class="bar-row">
                <span>${feature.label}</span>
                <span class="bar-track"><span class="bar-fill ${color}" style="--value:${feature.value}%"></span></span>
                <strong>${feature.value}%</strong>
              </div>
            `).join("")}
          </div>
        </div>
      </article>
    `;
  }).join("");

  const segmentCards = document.querySelector("#segmentCards");
  if (segmentCards) {
    segmentCards.innerHTML = finalData.segments.map((segment, index) => {
      const className = index === 0 ? "primary-segment" : "opportunity-segment";
      return `
        <article class="segment-card ${className}">
          <span class="card-kicker">Cluster ${segment.cluster} · ${segment.share}%</span>
          <h2>${segment.name}</h2>
          <p>${segment.description}</p>
        </article>
      `;
    }).join("");
  }
}

function renderInsights() {
  if (!finalData.demographics || !finalData.brandFactors) return;
  renderBars("#ageBars", finalData.demographics.age);
  renderBars("#regionBars", finalData.demographics.region);
  renderDonut("#genderDonut", "#genderTotal", "#genderLegend", finalData.demographics.gender);
  renderBars("#brandBars", finalData.brandFactors.brands);
  renderBars("#factorBars", finalData.brandFactors.benefits);

  const brand = finalData.brandUserDemographics;
  if (brand) {
    document.querySelector("#brandUserTitle").textContent = brand.title;
    document.querySelector("#brandUserSubtitle").textContent = brand.subtitle;
    renderDonut("#brandGenderDonut", "#brandGenderTotal", "#brandGenderLegend", brand.gender);
    renderBars("#brandAgeBars", brand.age);
    renderBars("#brandRegionBars", brand.region);
    renderBars("#brandChannelBars", brand.purchaseChannel);
  }

  const recommendationList = document.querySelector("#recommendationList");
  if (recommendationList && finalData.recommendations) {
    recommendationList.innerHTML = finalData.recommendations.map((item, index) => {
      const color = ["green", "cyan", "blue", "gold", "purple"][index % 5];
      return `
        <article class="recommendation-card" style="--bar-color:${colorMap[color]}">
          <span class="rec-icon">${String(index + 1).padStart(2, "0")}</span>
          <div>
            <h3>${item.title}</h3>
            <p>${item.body}</p>
            <span class="tag">${item.type}</span>
          </div>
        </article>
      `;
    }).join("");
  }
}

function setupProductChoices() {
  if (!neverUsed) return;

  methodInputs.forEach((input) => {
    input.addEventListener("change", () => {
      if (input === neverUsed && input.checked) {
        methodInputs.forEach((other) => {
          if (other !== neverUsed) other.checked = false;
        });
      }
      if (input !== neverUsed && input.checked) neverUsed.checked = false;
      updateProgress();
    });
  });
}

if (form) {
  form.addEventListener("change", updateProgress);

  form.addEventListener("reset", () => {
    setTimeout(() => {
      errorText?.classList.add("hidden");
      resetResult();
    }, 0);
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    errorText?.classList.add("hidden");

    if (completedSteps() < 7) {
      showAlert({
        title: "ดีจังจังยังเปิดการ์ดไม่ได้",
        text: "เลือกวิธีที่เคยใช้ปิดผมขาวในด่านที่ 4 ก่อนเปิดการ์ดผลลัพธ์",
        icon: "info"
      });
      return;
    }

    try {
      if (window.Swal) {
        Swal.fire({
          ...alertOptions,
          title: "ดีจังจังกำลังเปิดการ์ด",
          text: "ระบบกำลังคำนวณ DeeAsh Fit Score",
          allowOutsideClick: false,
          didOpen: () => Swal.showLoading()
        });
      }

      const result = await requestPrediction(formPayload());

      if (window.Swal) Swal.close();
      renderResult(result);
      showAlert({
        title: `การ์ดคาวาอี้เปิดแล้ว ${Math.round(result.score)}/100`,
        html: `<span class="kawaii-badge">${result.level}</span><span class="kawaii-badge">${result.persona}</span><br><br><span style="color:#66786f">${result.marketing_message}</span>`,
        icon: "success"
      });
    } catch (error) {
      if (window.Swal) Swal.close();
      const message = "ยังคำนวณ DeeAsh Fit Score ไม่ได้ กรุณารีเฟรชหน้าเว็บแล้วลองอีกครั้ง";
      if (errorText) {
        errorText.textContent = message;
        errorText.classList.remove("hidden");
      }
      showAlert({
        title: "คำนวณผลไม่ได้",
        text: message,
        icon: "error"
      });
    }
  });
}

setupProductChoices();
updateProgress();
renderSupervisedSummary();
renderModelPerformance();
renderSegments();
renderInsights();
activateTab(location.hash.replace("#", "") || "home");
