// Mascon Lead Finder browser bundle.
// Presets are bundled here so the page does not depend on a separate /shared module.

const NORTHEAST_STATES = [
  { code: "MA", name: "Massachusetts" },
  { code: "NH", name: "New Hampshire" },
  { code: "CT", name: "Connecticut" },
  { code: "NY", name: "New York" },
  { code: "RI", name: "Rhode Island" },
  { code: "NJ", name: "New Jersey" },
  { code: "VT", name: "Vermont" },
  { code: "ME", name: "Maine" },
  { code: "PA", name: "Pennsylvania" },
];

const STATE_PRESETS = [
  { id: "new-england", label: "New England", states: ["MA", "CT", "RI", "NH", "VT", "ME"] },
  { id: "new-england-ny-nj", label: "New England + NY + NJ", states: ["MA", "CT", "RI", "NH", "VT", "ME", "NY", "NJ"] },
  { id: "northeast", label: "Entire Northeast", states: NORTHEAST_STATES.map((state) => state.code) },
  { id: "clear", label: "Clear", states: [] },
];

const STATE_PRIORITY = {
  MA: 1,
  NH: 2,
  CT: 2,
  NY: 3,
  RI: 4,
  NJ: 5,
  VT: 6,
  ME: 7,
  PA: 8,
};

const INDUSTRY_GROUPS = [
  {
    id: "health-life-sciences",
    label: "Healthcare & Life Sciences",
    industries: [
      { id: "hospitals-health-systems", label: "Hospitals and health systems", naics: ["622"], searchTerms: ["hospital", "health system"], nppesTerms: ["General Acute Care Hospital"], defaultOperations: ["clinic-facility"] },
      { id: "clinics-physician-groups", label: "Clinics and physician groups", naics: ["6211", "6214", "62149"], searchTerms: ["clinic", "medical group", "physician"], nppesTerms: ["Clinic/Center", "Multi-Specialty"], defaultOperations: ["clinic-facility"] },
      { id: "dental-practices", label: "Dental practices", naics: ["6212"], searchTerms: ["dental", "dentist", "orthodont"], nppesTerms: ["Dentist"], defaultOperations: ["clinic-facility"] },
      { id: "rehabilitation-therapy", label: "Rehabilitation and therapy", naics: ["62134", "621498", "623"], searchTerms: ["rehabilitation", "physical therapy", "therapy"], nppesTerms: ["Physical Therapist", "Rehabilitation"], defaultOperations: ["clinic-facility"] },
      { id: "laboratories", label: "Laboratories", naics: ["6215", "54138", "541714"], searchTerms: ["laboratory", "diagnostic", "testing lab"], nppesTerms: ["Clinical Medical Laboratory"], defaultOperations: ["clinic-facility", "office-service"] },
      { id: "medical-device-companies", label: "Medical-device companies", naics: ["334510", "334517", "339112", "339113"], searchTerms: ["medical device", "medical equipment", "surgical"], defaultOperations: ["manufacturer", "distributor"] },
      { id: "pharma-biotechnology", label: "Pharmaceutical and biotechnology", naics: ["3254", "541714", "541715"], searchTerms: ["pharmaceutical", "biotech", "biotechnology", "therapeutics"], defaultOperations: ["manufacturer", "office-service"] },
      { id: "senior-care-home-health", label: "Senior care and home health", naics: ["6216", "6231", "6233"], searchTerms: ["home health", "senior care", "nursing", "assisted living"], nppesTerms: ["Home Health", "Skilled Nursing Facility", "Assisted Living Facility"], defaultOperations: ["clinic-facility"] },
      { id: "veterinary-services", label: "Veterinary services", naics: ["54194"], searchTerms: ["veterinary", "animal hospital", "pet clinic"], defaultOperations: ["clinic-facility", "office-service"] },
    ],
  },
  {
    id: "manufacturing-industrial",
    label: "Manufacturing & Industrial",
    industries: [
      { id: "general-manufacturing", label: "General manufacturing", naics: ["31", "32", "33"], searchTerms: ["manufacturing", "manufacturer", "industries"], defaultOperations: ["manufacturer"] },
      { id: "electronics-manufacturing", label: "Electronics manufacturing", naics: ["334"], searchTerms: ["electronics", "semiconductor", "circuit"], defaultOperations: ["manufacturer"] },
      { id: "automotive-transport-equipment", label: "Automotive and transportation equipment", naics: ["336"], searchTerms: ["automotive", "vehicle", "transportation equipment"], defaultOperations: ["manufacturer"] },
      { id: "medical-device-manufacturing", label: "Medical-device manufacturing", naics: ["334510", "334517", "339112", "339113"], searchTerms: ["medical device", "medical equipment", "surgical instrument"], defaultOperations: ["manufacturer"] },
      { id: "food-beverage-processing", label: "Food and beverage processing", naics: ["311", "3121"], searchTerms: ["food processing", "beverage", "foods", "bottling"], defaultOperations: ["manufacturer"] },
      { id: "packaging-printing", label: "Packaging and printing", naics: ["322", "323", "326111"], searchTerms: ["packaging", "printing", "labels", "carton"], defaultOperations: ["manufacturer"] },
      { id: "plastics-rubber", label: "Plastics and rubber", naics: ["326"], searchTerms: ["plastics", "rubber", "polymer"], defaultOperations: ["manufacturer"] },
      { id: "metal-fabrication-machining", label: "Metal fabrication and machining", naics: ["331", "332"], searchTerms: ["metal", "fabrication", "machining", "machine shop"], defaultOperations: ["manufacturer"] },
      { id: "chemical-manufacturing", label: "Chemical manufacturing", naics: ["325"], searchTerms: ["chemical", "chemicals", "coatings"], defaultOperations: ["manufacturer"] },
      { id: "textiles-apparel", label: "Textiles and apparel", naics: ["313", "314", "315", "316"], searchTerms: ["textile", "apparel", "garment", "fabric"], defaultOperations: ["manufacturer"] },
      { id: "industrial-equipment-machinery", label: "Industrial equipment and machinery", naics: ["333"], searchTerms: ["industrial equipment", "machinery", "machine"], defaultOperations: ["manufacturer", "distributor"] },
    ],
  },
  {
    id: "supply-chain-commerce",
    label: "Supply Chain & Commerce",
    industries: [
      { id: "warehousing-fulfillment", label: "Warehousing and fulfillment", naics: ["493"], searchTerms: ["warehouse", "warehousing", "fulfillment"], defaultOperations: ["warehouse"] },
      { id: "logistics-freight", label: "Logistics and freight", naics: ["488", "492"], searchTerms: ["logistics", "freight", "shipping"], defaultOperations: ["fleet-operator", "warehouse"] },
      { id: "trucking-fleet", label: "Trucking and fleet operations", naics: ["484", "485"], searchTerms: ["trucking", "transport", "carrier", "fleet"], defaultOperations: ["fleet-operator"] },
      { id: "wholesale-distribution", label: "Wholesale distribution", naics: ["42"], searchTerms: ["wholesale", "distributor", "distribution"], defaultOperations: ["distributor", "warehouse"] },
      { id: "importers-exporters", label: "Importers and exporters", naics: ["423", "424", "425"], searchTerms: ["import", "export", "trading"], defaultOperations: ["distributor", "office-service"] },
      { id: "retail-chains", label: "Retail chains", naics: ["44", "45"], searchTerms: ["retail", "stores", "market"], defaultOperations: ["retailer", "multi-location"] },
      { id: "ecommerce-businesses", label: "E-commerce businesses", naics: ["454110", "459"], searchTerms: ["ecommerce", "e-commerce", "online store"], defaultOperations: ["retailer", "warehouse"] },
      { id: "grocery-convenience", label: "Grocery and convenience stores", naics: ["4451", "445131"], searchTerms: ["grocery", "supermarket", "convenience"], defaultOperations: ["retailer", "multi-location"] },
    ],
  },
  {
    id: "food-hospitality-consumer",
    label: "Food, Hospitality & Consumer Services",
    industries: [
      { id: "restaurants", label: "Restaurants", naics: ["7225"], searchTerms: ["restaurant", "cafe", "kitchen"], defaultOperations: ["restaurant"] },
      { id: "hotels-hospitality", label: "Hotels and hospitality", naics: ["7211"], searchTerms: ["hotel", "hospitality", "lodging", "inn"], defaultOperations: ["multi-location", "office-service"] },
      { id: "catering-food-service", label: "Catering and food service", naics: ["7223"], searchTerms: ["catering", "food service"], defaultOperations: ["restaurant", "office-service"] },
      { id: "salons-spas", label: "Salons and spas", naics: ["812112", "812113", "812199"], searchTerms: ["salon", "spa", "beauty"], defaultOperations: ["office-service"] },
      { id: "fitness-wellness", label: "Fitness and wellness", naics: ["71394", "81219"], searchTerms: ["fitness", "gym", "wellness"], defaultOperations: ["office-service", "multi-location"] },
      { id: "entertainment-recreation", label: "Entertainment and recreation", naics: ["71"], searchTerms: ["entertainment", "recreation", "amusement"], defaultOperations: ["office-service", "multi-location"] },
      { id: "laundry-cleaning", label: "Laundry and cleaning services", naics: ["56172", "8123"], searchTerms: ["laundry", "cleaning", "janitorial"], defaultOperations: ["office-service"] },
    ],
  },
  {
    id: "construction-property-facilities",
    label: "Construction, Property & Facilities",
    industries: [
      { id: "construction-companies", label: "Construction companies", naics: ["23"], searchTerms: ["construction", "builders", "building"], defaultOperations: ["contractor"] },
      { id: "contractors-trades", label: "Contractors and trades", naics: ["238"], searchTerms: ["contractor", "electric", "plumbing", "roofing", "hvac"], defaultOperations: ["contractor"] },
      { id: "property-management", label: "Property management", naics: ["53131"], searchTerms: ["property management", "properties"], defaultOperations: ["office-service", "multi-location"] },
      { id: "commercial-real-estate", label: "Commercial real estate", naics: ["5311", "5312", "5313"], searchTerms: ["commercial real estate", "realty", "properties"], defaultOperations: ["office-service"] },
      { id: "building-maintenance", label: "Building maintenance", naics: ["56121", "56172", "56179"], searchTerms: ["facility services", "maintenance", "janitorial"], defaultOperations: ["contractor", "office-service"] },
      { id: "security-services", label: "Security services", naics: ["56161"], searchTerms: ["security", "guard", "alarm"], defaultOperations: ["office-service"] },
      { id: "waste-recycling", label: "Waste management and recycling", naics: ["562"], searchTerms: ["waste", "recycling", "disposal"], defaultOperations: ["fleet-operator", "warehouse"] },
    ],
  },
  {
    id: "technology-business-services",
    label: "Technology & Business Services",
    industries: [
      { id: "software-it-services", label: "Software and IT services", naics: ["5112", "518", "5415"], searchTerms: ["software", "information technology", "IT services"], defaultOperations: ["office-service"] },
      { id: "systems-integrators", label: "Systems integrators", naics: ["541512", "541519"], searchTerms: ["systems integration", "integrator", "automation"], defaultOperations: ["office-service", "distributor"] },
      { id: "telecommunications", label: "Telecommunications", naics: ["517"], searchTerms: ["telecommunications", "telecom", "communications"], defaultOperations: ["office-service"] },
      { id: "professional-services", label: "Professional services", naics: ["54"], searchTerms: ["professional services", "services group"], defaultOperations: ["office-service"] },
      { id: "consulting", label: "Consulting", naics: ["5416"], searchTerms: ["consulting", "advisory"], defaultOperations: ["office-service"] },
      { id: "staffing-recruitment", label: "Staffing and recruitment", naics: ["5613"], searchTerms: ["staffing", "recruiting", "employment"], defaultOperations: ["office-service"] },
      { id: "financial-services", label: "Financial services", naics: ["52"], searchTerms: ["financial", "capital", "bank", "credit"], defaultOperations: ["office-service"] },
      { id: "insurance", label: "Insurance", naics: ["524"], searchTerms: ["insurance", "assurance"], defaultOperations: ["office-service"] },
      { id: "legal-accounting", label: "Legal and accounting services", naics: ["5411", "5412"], searchTerms: ["law", "legal", "accounting", "CPA"], defaultOperations: ["office-service"] },
    ],
  },
  {
    id: "education-institutional",
    label: "Education & Institutions",
    industries: [
      { id: "schools-universities", label: "Schools and universities", naics: ["6111", "6112", "6113"], searchTerms: ["school", "college", "university", "academy"], defaultOperations: ["clinic-facility", "multi-location"] },
      { id: "childcare-centers", label: "Childcare centers", naics: ["624410"], searchTerms: ["child care", "daycare", "early learning"], defaultOperations: ["clinic-facility"] },
      { id: "nonprofits", label: "Nonprofits", naics: ["813"], searchTerms: ["foundation", "nonprofit", "association"], defaultOperations: ["office-service"] },
      { id: "research-institutions", label: "Research institutions", naics: ["5417"], searchTerms: ["research", "institute", "laboratory"], defaultOperations: ["office-service", "clinic-facility"] },
      { id: "municipal-public-facilities", label: "Municipal and public facilities", naics: ["92"], searchTerms: ["municipal", "public works", "authority"], defaultOperations: ["clinic-facility", "office-service"] },
    ],
  },
];

const BUSINESS_OPERATIONS = [
  { id: "manufacturer", label: "Manufacturer" },
  { id: "warehouse", label: "Warehouse" },
  { id: "distributor", label: "Distributor" },
  { id: "retailer", label: "Retailer" },
  { id: "clinic-facility", label: "Clinic / Facility" },
  { id: "restaurant", label: "Restaurant" },
  { id: "fleet-operator", label: "Fleet operator" },
  { id: "contractor", label: "Contractor" },
  { id: "office-service", label: "Office / Service provider" },
  { id: "multi-location", label: "Multi-location business" },
];

const INDUSTRIES = INDUSTRY_GROUPS.flatMap((group) =>
  group.industries.map((industry) => ({ ...industry, groupId: group.id, groupLabel: group.label })),
);

const INDUSTRY_BY_ID = Object.fromEntries(INDUSTRIES.map((industry) => [industry.id, industry]));
const OPERATION_BY_ID = Object.fromEntries(BUSINESS_OPERATIONS.map((operation) => [operation.id, operation]));

const ECHO_INDUSTRY_IDS = new Set([
  "general-manufacturing", "electronics-manufacturing", "automotive-transport-equipment",
  "medical-device-manufacturing", "food-beverage-processing", "packaging-printing",
  "plastics-rubber", "metal-fabrication-machining", "chemical-manufacturing",
  "textiles-apparel", "industrial-equipment-machinery", "warehousing-fulfillment",
  "logistics-freight", "trucking-fleet", "wholesale-distribution", "waste-recycling",
  "construction-companies", "contractors-trades", "building-maintenance",
  "laboratories", "medical-device-companies", "pharma-biotechnology",
]);

const FMCSA_INDUSTRY_IDS = new Set(["logistics-freight", "trucking-fleet"]);

const NPPES_INDUSTRY_IDS = new Set(
  INDUSTRIES.filter((industry) => Array.isArray(industry.nppesTerms) && industry.nppesTerms.length > 0)
    .map((industry) => industry.id),
);

const CSV_COLUMNS = [
  ["Parent Company Name", "parentCompanyName"],
  ["Location Name", "locationName"],
  ["Company Name", "companyName"],
  ["Industry", "industry"],
  ["Business Operation", "businessOperation"],
  ["NAICS Code", "naicsCode"],
  ["Business Type", "businessType"],
  ["Address", "address"],
  ["City", "city"],
  ["State", "state"],
  ["ZIP", "zip"],
  ["Phone", "phone"],
  ["Email", "email"],
  ["Contact Person", "contactPerson"],
  ["Website", "website"],
  ["Company Status", "companyStatus"],
  ["Registration Date", "registrationDate"],
  ["Data Source", "dataSource"],
  ["Source Record ID", "sourceRecordId"],
];


const state = {
  results: [],
  query: null,
  loadingTimer: null,
};

const elements = {
  form: document.querySelector("#lead-search-form"),
  industryGroups: document.querySelector("#industry-groups"),
  operationOptions: document.querySelector("#operation-options"),
  stateOptions: document.querySelector("#state-options"),
  regionPresets: document.querySelector("#region-presets"),
  limitOptions: document.querySelector("#limit-options"),
  clearIndustries: document.querySelector("#clear-industries"),
  resetButton: document.querySelector("#reset-button"),
  searchButton: document.querySelector("#search-button"),
  industryError: document.querySelector("#industry-error"),
  stateError: document.querySelector("#state-error"),
  loadingPanel: document.querySelector("#loading-panel"),
  loadingMessage: document.querySelector("#loading-message"),
  resultsPanel: document.querySelector("#results-panel"),
  resultsSummary: document.querySelector("#results-summary"),
  sourceSummary: document.querySelector("#source-summary"),
  warningList: document.querySelector("#warning-list"),
  exportButton: document.querySelector("#export-button"),
  previewTable: document.querySelector("#preview-table"),
  emptyPanel: document.querySelector("#empty-panel"),
  errorPanel: document.querySelector("#error-panel"),
  errorMessage: document.querySelector("#error-message"),
  includeKeywords: document.querySelector("#include-keywords"),
  excludeKeywords: document.querySelector("#exclude-keywords"),
};

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderIndustryGroups() {
  elements.industryGroups.innerHTML = INDUSTRY_GROUPS.map((group, index) => `
    <details class="industry-group" ${index === 0 ? "open" : ""}>
      <summary>
        <span>${escapeHtml(group.label)} <span class="industry-count">${group.industries.length} categories</span></span>
      </summary>
      <div class="industry-options">
        ${group.industries.map((industry) => `
          <label class="check-option">
            <input type="checkbox" name="industries" value="${industry.id}" />
            <span>${escapeHtml(industry.label)}</span>
          </label>
        `).join("")}
      </div>
    </details>
  `).join("");
}

function renderOperations() {
  elements.operationOptions.innerHTML = BUSINESS_OPERATIONS.map((operation) => `
    <label class="check-option">
      <input type="checkbox" name="operations" value="${operation.id}" />
      <span>${escapeHtml(operation.label)}</span>
    </label>
  `).join("");
}

function renderStates() {
  elements.stateOptions.innerHTML = NORTHEAST_STATES.map((item) => `
    <label class="check-option">
      <input type="checkbox" name="states" value="${item.code}" />
      <span><strong>${item.code}</strong><br>${escapeHtml(item.name)}</span>
    </label>
  `).join("");
  elements.regionPresets.innerHTML = STATE_PRESETS.map((preset) => `
    <button type="button" class="preset-button" data-preset="${preset.id}">${escapeHtml(preset.label)}</button>
  `).join("");
}

function renderLimits() {
  elements.limitOptions.innerHTML = [50, 100, 200, 300].map((limit) => `
    <div class="limit-option">
      <input id="limit-${limit}" type="radio" name="limit" value="${limit}" ${limit === 300 ? "checked" : ""} />
      <label for="limit-${limit}">${limit}</label>
    </div>
  `).join("");
}

function selectedValues(name) {
  return [...document.querySelectorAll(`input[name="${name}"]:checked`)].map((input) => input.value);
}

function parseKeywords(value) {
  return [...new Set(value.split(",").map((term) => term.trim()).filter(Boolean))];
}

function setStatePreset(presetId) {
  const preset = STATE_PRESETS.find((item) => item.id === presetId);
  if (!preset) return;
  const selected = new Set(preset.states);
  document.querySelectorAll('input[name="states"]').forEach((input) => {
    input.checked = selected.has(input.value);
  });
  updatePresetButtons();
}

function updatePresetButtons() {
  const current = new Set(selectedValues("states"));
  document.querySelectorAll(".preset-button").forEach((button) => {
    const preset = STATE_PRESETS.find((item) => item.id === button.dataset.preset);
    const isActive = preset && preset.states.length === current.size && preset.states.every((code) => current.has(code));
    button.classList.toggle("active", Boolean(isActive));
  });
}

function resetPanels() {
  elements.resultsPanel.hidden = true;
  elements.emptyPanel.hidden = true;
  elements.errorPanel.hidden = true;
  elements.warningList.innerHTML = "";
  elements.warningList.hidden = true;
  elements.emptyPanel.querySelectorAll(".warning-list").forEach((node) => node.remove());
}

function setLoading(isLoading) {
  elements.loadingPanel.hidden = !isLoading;
  elements.searchButton.disabled = isLoading;
  if (!isLoading && state.loadingTimer) {
    clearInterval(state.loadingTimer);
    state.loadingTimer = null;
  }
}

function startLoadingMessages() {
  const messages = [
    "Preparing search criteria…",
    "Selecting relevant government sources…",
    "Searching active business and facility records…",
    "Standardizing fields across data sources…",
    "Removing duplicate physical locations…",
    "Balancing results across selected industries…",
    "Preparing the CSV preview…",
  ];
  let index = 0;
  elements.loadingMessage.textContent = messages[index];
  state.loadingTimer = setInterval(() => {
    index = Math.min(index + 1, messages.length - 1);
    elements.loadingMessage.textContent = messages[index];
  }, 1350);
}

function validateQuery(query) {
  const industryValid = query.industries.length > 0;
  const stateValid = query.states.length > 0;
  elements.industryError.hidden = industryValid;
  elements.stateError.hidden = stateValid;
  if (!industryValid) document.querySelector("#industries-title")?.scrollIntoView({ behavior: "smooth", block: "center" });
  return industryValid && stateValid;
}

function buildQuery() {
  return {
    industries: selectedValues("industries"),
    operations: selectedValues("operations"),
    states: selectedValues("states"),
    includeKeywords: parseKeywords(elements.includeKeywords.value),
    excludeKeywords: parseKeywords(elements.excludeKeywords.value),
    limit: Number(document.querySelector('input[name="limit"]:checked')?.value || 300),
  };
}

function renderWarnings(warnings = []) {
  elements.warningList.hidden = warnings.length === 0;
  elements.warningList.innerHTML = warnings.map((warning) => `<div class="warning-item">${escapeHtml(warning)}</div>`).join("");
}

function renderTable(rows) {
  const previewColumns = CSV_COLUMNS.filter(([header]) => [
    "Company Name", "Industry", "Business Operation", "Business Type", "Address", "City", "State", "ZIP",
    "Phone", "Email", "Contact Person", "Website", "Company Status", "Registration Date", "Data Source",
  ].includes(header));

  elements.previewTable.querySelector("thead").innerHTML = `<tr>${previewColumns.map(([header]) => `<th>${escapeHtml(header)}</th>`).join("")}</tr>`;
  elements.previewTable.querySelector("tbody").innerHTML = rows.slice(0, 10).map((row) => `
    <tr>${previewColumns.map(([, key]) => `<td>${escapeHtml(row[key] || "")}</td>`).join("")}</tr>
  `).join("");
}

function renderResults(payload) {
  state.results = payload.records || [];
  if (state.results.length === 0) {
    elements.emptyPanel.hidden = false;
    if (payload.warnings?.length) {
      elements.emptyPanel.insertAdjacentHTML("beforeend", `<div class="warning-list">${payload.warnings.map((warning) => `<div class="warning-item">${escapeHtml(warning)}</div>`).join("")}</div>`);
    }
    return;
  }

  elements.resultsPanel.hidden = false;
  elements.resultsSummary.textContent = `${state.results.length.toLocaleString()} active location-level records are ready. Previewing the first ${Math.min(10, state.results.length)}.`;
  const sources = payload.sources?.length ? payload.sources.join(" · ") : "No source details returned";
  elements.sourceSummary.innerHTML = `<strong>Sources contributing records:</strong>${escapeHtml(sources)}`;
  renderWarnings(payload.warnings || []);
  renderTable(state.results);
  elements.resultsPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function csvEscape(value) {
  const text = String(value ?? "");
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function exportCsv() {
  if (!state.results.length || !state.query) return;
  const header = CSV_COLUMNS.map(([label]) => csvEscape(label)).join(",");
  const body = state.results.map((row) => CSV_COLUMNS.map(([, key]) => csvEscape(row[key] || "")).join(",")).join("\r\n");
  const csv = `\uFEFF${header}\r\n${body}`;
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const industries = state.query.industries.slice(0, 2).map((id) => INDUSTRY_BY_ID[id]?.label || id)
    .join("-").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || "leads";
  const states = state.query.states.join("-").toLowerCase();
  const date = new Date().toISOString().slice(0, 10);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `mascon_leads_${industries}_${states}_${date}.csv`;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

async function handleSubmit(event) {
  event.preventDefault();
  const query = buildQuery();
  if (!validateQuery(query)) return;

  state.query = query;
  state.results = [];
  resetPanels();
  setLoading(true);
  startLoadingMessages();

  try {
    const response = await fetch("/.netlify/functions/search-leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(query),
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.error || `Search failed with status ${response.status}.`);
    renderResults(payload);
  } catch (error) {
    elements.errorPanel.hidden = false;
    elements.errorMessage.textContent = error instanceof Error ? error.message : "An unexpected error occurred.";
    elements.errorPanel.scrollIntoView({ behavior: "smooth", block: "center" });
  } finally {
    setLoading(false);
  }
}

function resetForm() {
  elements.form.reset();
  setStatePreset("new-england");
  document.querySelector("#limit-300").checked = true;
  elements.industryError.hidden = true;
  elements.stateError.hidden = true;
  resetPanels();
  state.results = [];
  state.query = null;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

try {
  renderIndustryGroups();
  renderOperations();
  renderStates();
  renderLimits();
  setStatePreset("new-england");
  const frontendWarning = document.querySelector("#frontend-warning");
  if (frontendWarning) frontendWarning.hidden = true;
} catch (error) {
  const frontendWarning = document.querySelector("#frontend-warning");
  if (frontendWarning) {
    frontendWarning.hidden = false;
    frontendWarning.textContent = `The interface could not initialize: ${error instanceof Error ? error.message : "unknown error"}`;
  }
  throw error;
}

elements.form.addEventListener("submit", handleSubmit);
elements.exportButton.addEventListener("click", exportCsv);
elements.resetButton.addEventListener("click", resetForm);
elements.clearIndustries.addEventListener("click", () => {
  document.querySelectorAll('input[name="industries"]').forEach((input) => { input.checked = false; });
});
elements.regionPresets.addEventListener("click", (event) => {
  const button = event.target.closest("[data-preset]");
  if (button) setStatePreset(button.dataset.preset);
});
elements.stateOptions.addEventListener("change", updatePresetButtons);
