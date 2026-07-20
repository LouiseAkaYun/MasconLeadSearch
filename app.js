"use strict";

const NEW_ENGLAND_STATES = [
  { code: "MA", name: "Massachusetts" },
  { code: "CT", name: "Connecticut" },
  { code: "RI", name: "Rhode Island" },
  { code: "NH", name: "New Hampshire" },
  { code: "VT", name: "Vermont" },
  { code: "ME", name: "Maine" },
];
const STATE_PRIORITY = { MA: 1, NH: 2, CT: 2, RI: 3, VT: 4, ME: 5 };
const MAX_PRESET_INDUSTRIES = 5;

const INDUSTRY_GROUPS = [
  { group: "Potential Blade Customers", items: [
    { id:"animal-slaughter-processing", label:"Animal Slaughtering and Processing", displayCode:"31161", codes:["31161"] },
    { id:"animal-slaughtering", label:"Animal (except Poultry) Slaughtering", displayCode:"311611", codes:["311611"] },
    { id:"meat-from-carcasses", label:"Meat Processed from Carcasses", displayCode:"311612", codes:["311612"] },
    { id:"rendering-byproducts", label:"Rendering and Meat Byproduct Processing", displayCode:"311613", codes:["311613"] },
    { id:"poultry-processing", label:"Poultry Processing", displayCode:"311615", codes:["311615"] },
    { id:"seafood-processing", label:"Seafood Product Preparation and Packaging", displayCode:"311710", codes:["311710"] },
    { id:"specialty-food", label:"Fruit, Vegetable and Specialty Food Manufacturing", displayCode:"3114", codes:["3114"] },
    { id:"bakery-products", label:"Bakeries and Tortilla Manufacturing", displayCode:"3118", codes:["3118"] },
    { id:"other-food", label:"Other Food Manufacturing", displayCode:"3119", codes:["3119"] },
    { id:"paper-mills", label:"Pulp, Paper and Paperboard Mills", displayCode:"3221", codes:["3221"] },
    { id:"converted-paper", label:"Converted Paper Product Manufacturing", displayCode:"3222", codes:["3222"] },
    { id:"printing", label:"Printing and Related Support Activities", displayCode:"3231", codes:["3231"] },
    { id:"plastics-products", label:"Plastics Product Manufacturing", displayCode:"3261", codes:["3261"] },
    { id:"rubber-products", label:"Rubber Product Manufacturing", displayCode:"3262", codes:["3262"] },
    { id:"textile-mills", label:"Textile Mills", displayCode:"313", codes:["313"] },
    { id:"textile-products", label:"Textile Product Mills", displayCode:"314", codes:["314"] },
    { id:"apparel", label:"Apparel Manufacturing", displayCode:"315", codes:["315"] },
    { id:"leather", label:"Leather and Allied Product Manufacturing", displayCode:"316", codes:["316"] },
    { id:"wood-products", label:"Wood Product Manufacturing", displayCode:"321", codes:["321"] },
    { id:"furniture", label:"Furniture and Related Product Manufacturing", displayCode:"337", codes:["337"] },
    { id:"primary-metals", label:"Primary Metal Manufacturing", displayCode:"331", codes:["331"] },
    { id:"fabricated-metals", label:"Fabricated Metal Product Manufacturing", displayCode:"332", codes:["332"] },
    { id:"machinery", label:"Machinery Manufacturing", displayCode:"333", codes:["333"] },
    { id:"transport-equipment", label:"Transportation Equipment Manufacturing", displayCode:"336", codes:["336"] },
    { id:"gaskets-seals", label:"Gasket, Packing and Sealing Device Manufacturing", displayCode:"339991", codes:["339991"] },
    { id:"materials-recovery", label:"Materials Recovery Facilities", displayCode:"562920", codes:["562920"] },
    { id:"waste-treatment", label:"Waste Treatment and Disposal", displayCode:"5622", codes:["5622"] },
    { id:"medical-equipment", label:"Medical Equipment and Supplies Manufacturing", displayCode:"33911", codes:["33911"] },
    { id:"surgical-instruments", label:"Surgical and Medical Instrument Manufacturing", displayCode:"339112", codes:["339112"] },
    { id:"surgical-supplies", label:"Surgical Appliance and Supplies Manufacturing", displayCode:"339113", codes:["339113"] },
  ]},
  { group: "Manufacturing and Processing", items: [
    { id:"all-manufacturing", label:"All Manufacturing", displayCode:"31–33", codes:["31","32","33"] },
    { id:"food-manufacturing", label:"Food Manufacturing", displayCode:"311", codes:["311"] },
    { id:"beverage-manufacturing", label:"Beverage Manufacturing", displayCode:"3121", codes:["3121"] },
    { id:"chemical-manufacturing", label:"Chemical Manufacturing", displayCode:"325", codes:["325"] },
    { id:"pharma-manufacturing", label:"Pharmaceutical and Medicine Manufacturing", displayCode:"3254", codes:["3254"] },
    { id:"plastics-rubber", label:"Plastics and Rubber Products Manufacturing", displayCode:"326", codes:["326"] },
    { id:"electronics-manufacturing", label:"Computer and Electronic Product Manufacturing", displayCode:"334", codes:["334"] },
    { id:"electrical-equipment", label:"Electrical Equipment and Appliance Manufacturing", displayCode:"335", codes:["335"] },
    { id:"misc-manufacturing", label:"Miscellaneous Manufacturing", displayCode:"339", codes:["339"] },
  ]},
  { group: "Supply Chain and Commerce", items: [
    { id:"wholesale-trade", label:"Wholesale Trade", displayCode:"42", codes:["42"] },
    { id:"durable-wholesale", label:"Merchant Wholesalers, Durable Goods", displayCode:"423", codes:["423"] },
    { id:"medical-wholesale", label:"Medical, Dental and Hospital Equipment Wholesalers", displayCode:"423450", codes:["423450"] },
    { id:"industrial-wholesale", label:"Industrial Supplies Merchant Wholesalers", displayCode:"423840", codes:["423840"] },
    { id:"nondurable-wholesale", label:"Merchant Wholesalers, Nondurable Goods", displayCode:"424", codes:["424"] },
    { id:"transport-warehouse", label:"Transportation and Warehousing", displayCode:"48–49", codes:["48","49"] },
    { id:"truck-transport", label:"Truck Transportation", displayCode:"484", codes:["484"] },
    { id:"support-transport", label:"Support Activities for Transportation", displayCode:"488", codes:["488"] },
    { id:"couriers", label:"Couriers and Messengers", displayCode:"492", codes:["492"] },
    { id:"warehousing", label:"Warehousing and Storage", displayCode:"493", codes:["493"] },
    { id:"general-warehousing", label:"General Warehousing and Storage", displayCode:"493110", codes:["493110"] },
    { id:"refrigerated-warehousing", label:"Refrigerated Warehousing and Storage", displayCode:"493120", codes:["493120"] },
    { id:"retail-trade", label:"Retail Trade", displayCode:"44–45", codes:["44","45"] },
    { id:"grocery-stores", label:"Grocery Stores", displayCode:"4451", codes:["4451"] },
  ]},
  { group: "Healthcare and Life Sciences", items: [
    { id:"healthcare-social", label:"Health Care and Social Assistance", displayCode:"62", codes:["62"] },
    { id:"ambulatory-care", label:"Ambulatory Health Care Services", displayCode:"621", codes:["621"] },
    { id:"physician-offices", label:"Offices of Physicians", displayCode:"6211", codes:["6211"] },
    { id:"dental-offices", label:"Offices of Dentists", displayCode:"6212", codes:["6212"] },
    { id:"health-practitioners", label:"Offices of Other Health Practitioners", displayCode:"6213", codes:["6213"] },
    { id:"outpatient-centers", label:"Outpatient Care Centers", displayCode:"6214", codes:["6214"] },
    { id:"medical-labs", label:"Medical and Diagnostic Laboratories", displayCode:"6215", codes:["6215"] },
    { id:"home-health", label:"Home Health Care Services", displayCode:"6216", codes:["6216"] },
    { id:"hospitals", label:"Hospitals", displayCode:"622", codes:["622"] },
    { id:"nursing-residential", label:"Nursing and Residential Care Facilities", displayCode:"623", codes:["623"] },
    { id:"scientific-rd", label:"Scientific Research and Development Services", displayCode:"5417", codes:["5417"] },
    { id:"testing-labs", label:"Testing Laboratories and Services", displayCode:"54138", codes:["54138"] },
    { id:"veterinary", label:"Veterinary Services", displayCode:"54194", codes:["54194"] },
  ]},
  { group: "Food, Hospitality and Consumer Services", items: [
    { id:"accommodation-food", label:"Accommodation and Food Services", displayCode:"72", codes:["72"] },
    { id:"accommodation", label:"Accommodation", displayCode:"721", codes:["721"] },
    { id:"food-services", label:"Food Services and Drinking Places", displayCode:"722", codes:["722"] },
    { id:"restaurants", label:"Restaurants and Other Eating Places", displayCode:"7225", codes:["7225"] },
    { id:"fitness", label:"Fitness and Recreational Sports Centers", displayCode:"713940", codes:["713940"] },
    { id:"personal-care", label:"Personal Care Services", displayCode:"8121", codes:["8121"] },
    { id:"laundry", label:"Drycleaning and Laundry Services", displayCode:"8123", codes:["8123"] },
  ]},
  { group: "Construction, Property and Facilities", items: [
    { id:"construction", label:"Construction", displayCode:"23", codes:["23"] },
    { id:"building-construction", label:"Construction of Buildings", displayCode:"236", codes:["236"] },
    { id:"heavy-construction", label:"Heavy and Civil Engineering Construction", displayCode:"237", codes:["237"] },
    { id:"specialty-contractors", label:"Specialty Trade Contractors", displayCode:"238", codes:["238"] },
    { id:"property-management", label:"Real Estate Property Managers", displayCode:"53131", codes:["53131"] },
    { id:"facilities-support", label:"Facilities Support Services", displayCode:"5612", codes:["5612"] },
    { id:"security-services", label:"Investigation and Security Services", displayCode:"5616", codes:["5616"] },
    { id:"waste-management", label:"Waste Management and Remediation Services", displayCode:"562", codes:["562"] },
  ]},
  { group: "Technology and Business Services", items: [
    { id:"information", label:"Information", displayCode:"51", codes:["51"] },
    { id:"telecommunications", label:"Telecommunications", displayCode:"517", codes:["517"] },
    { id:"professional-services", label:"Professional, Scientific and Technical Services", displayCode:"54", codes:["54"] },
    { id:"computer-services", label:"Computer Systems Design and Related Services", displayCode:"5415", codes:["5415"] },
    { id:"consulting", label:"Management, Scientific and Technical Consulting", displayCode:"5416", codes:["5416"] },
    { id:"finance-insurance", label:"Finance and Insurance", displayCode:"52", codes:["52"] },
    { id:"insurance", label:"Insurance Carriers and Related Activities", displayCode:"524", codes:["524"] },
    { id:"legal-services", label:"Legal Services", displayCode:"5411", codes:["5411"] },
    { id:"accounting", label:"Accounting and Bookkeeping Services", displayCode:"5412", codes:["5412"] },
    { id:"staffing", label:"Employment Services", displayCode:"5613", codes:["5613"] },
  ]},
  { group: "Education and Institutions", items: [
    { id:"educational-services", label:"Educational Services", displayCode:"61", codes:["61"] },
    { id:"schools", label:"Elementary and Secondary Schools", displayCode:"6111", codes:["6111"] },
    { id:"colleges", label:"Colleges, Universities and Professional Schools", displayCode:"6113", codes:["6113"] },
    { id:"social-assistance", label:"Social Assistance", displayCode:"624", codes:["624"] },
    { id:"child-care", label:"Child Care Services", displayCode:"6244", codes:["6244"] },
  ]},
];

const INDUSTRIES = INDUSTRY_GROUPS.flatMap(group => group.items.map(item => ({...item, group: group.group})));
const INDUSTRY_BY_ID = Object.fromEntries(INDUSTRIES.map(item => [item.id, item]));

const OPERATIONS = [
  { id:"manufacturer", label:"Manufacturer / Processor", prefixes:["31","32","33"] },
  { id:"warehouse", label:"Warehouse / Fulfillment", prefixes:["493"] },
  { id:"distributor", label:"Wholesaler / Distributor", prefixes:["42"] },
  { id:"retailer", label:"Retailer", prefixes:["44","45"] },
  { id:"transport", label:"Transportation / Fleet", prefixes:["48","49"] },
  { id:"healthcare", label:"Healthcare Facility", prefixes:["62"] },
  { id:"hospitality", label:"Restaurant / Hospitality", prefixes:["72"] },
  { id:"contractor", label:"Construction / Contractor", prefixes:["23"] },
  { id:"office-service", label:"Office / Service Provider", prefixes:["51","52","53","54","55","56","61","81"] },
];
const OPERATION_BY_ID = Object.fromEntries(OPERATIONS.map(o => [o.id, o]));

const state = {
  selectedIndustryIds: [],
  customNaics: [],
  results: [],
  query: null,
};

const $ = selector => document.querySelector(selector);
const elements = {
  form: $("#search-form"),
  industrySearch: $("#industry-search"),
  industryToggle: $("#industry-toggle"),
  industryDropdown: $("#industry-dropdown"),
  selectedIndustries: $("#selected-industries"),
  customNaics: $("#custom-naics"),
  addNaics: $("#add-naics"),
  selectedCustomNaics: $("#selected-custom-naics"),
  industryError: $("#industry-error"),
  naicsError: $("#naics-error"),
  operationOptions: $("#operation-options"),
  regionPresets: $("#region-presets"),
  stateOptions: $("#state-options"),
  stateError: $("#state-error"),
  includeKeywords: $("#include-keywords"),
  excludeKeywords: $("#exclude-keywords"),
  limitOptions: $("#limit-options"),
  searchButton: $("#search-button"),
  resetButton: $("#reset-button"),
  progressPanel: $("#progress-panel"),
  progressMessage: $("#progress-message"),
  sourceStatus: $("#source-status"),
  errorPanel: $("#error-panel"),
  errorMessage: $("#error-message"),
  emptyPanel: $("#empty-panel"),
  emptyWarningList: $("#empty-warning-list"),
  diagnosticsPanel: $("#diagnostics-panel"),
  diagnosticsBody: $("#diagnostics-body"),
  resultsPanel: $("#results-panel"),
  resultsSummary: $("#results-summary"),
  sourceSummary: $("#source-summary"),
  warningList: $("#warning-list"),
  previewTable: $("#preview-table"),
  exportButton: $("#export-button"),
};

function clean(value) { return String(value ?? "").replace(/\s+/g, " ").trim(); }
function escapeHtml(value) { return clean(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;"); }
function unique(values) { return [...new Set(values.filter(Boolean))]; }
function selectedCheckboxValues(name) { return [...document.querySelectorAll(`input[name="${name}"]:checked`)].map(input => input.value); }
function parseKeywords(value) { return unique(String(value).split(/[,;\n]+/).map(v => v.trim().toLowerCase()).filter(Boolean)); }
function normalizeName(value) { return clean(value).toUpperCase().replace(/\b(INCORPORATED|INC|LLC|L L C|CORPORATION|CORP|COMPANY|CO|LIMITED|LTD)\b\.?/g, "").replace(/[^A-Z0-9]/g, ""); }
function normalizeAddress(value) { return clean(value).toUpperCase().replace(/\b(STREET|ST|ROAD|RD|AVENUE|AVE|BOULEVARD|BLVD|DRIVE|DR|LANE|LN|HIGHWAY|HWY|ROUTE|RTE)\b\.?/g, "").replace(/[^A-Z0-9]/g, ""); }
function firstField(row, fields) { for (const field of fields) if (clean(row?.[field])) return clean(row[field]); return ""; }
function joinAddress(...parts) { return parts.map(clean).filter(Boolean).join(", "); }
function soqlEscape(value) { return String(value).replaceAll("'", "''"); }
function sourceKey(record) { return `${normalizeName(record.companyName)}|${normalizeAddress(record.address)}|${clean(record.zip).slice(0,5)}|${record.state}`; }

function extractNaicsCodes(value) {
  return unique((String(value ?? "").match(/\b\d{2,6}\b/g) || []).filter(code => code.length >= 2 && code.length <= 6));
}
function codeMatches(actualCode, selectedCode) { return String(actualCode).startsWith(String(selectedCode)); }
function recordMatchesCodes(actualCodes, selectedCodes) { return actualCodes.some(actual => selectedCodes.some(selectedCode => codeMatches(actual, selectedCode))); }
function compressCodes(codes) {
  const sorted = unique(codes.map(String).filter(Boolean)).sort((a,b) => a.length - b.length || a.localeCompare(b));
  return sorted.filter((code, index) => !sorted.slice(0, index).some(parent => code.startsWith(parent)));
}
function selectedGroups(query) {
  const presets = query.industryIds.map(id => ({ key:`preset:${id}`, label:INDUSTRY_BY_ID[id].label, displayCode:INDUSTRY_BY_ID[id].displayCode, codes:INDUSTRY_BY_ID[id].codes }));
  const customs = query.customNaics.map(code => ({ key:`custom:${code}`, label:`Custom NAICS ${code}`, displayCode:code, codes:expandRangeCode(code) }));
  return [...presets, ...customs];
}
function allSelectedCodes(query) { return compressCodes(selectedGroups(query).flatMap(group => group.codes)); }
function groupKeysForCodes(actualCodes, query) { return selectedGroups(query).filter(group => recordMatchesCodes(actualCodes, group.codes)).map(group => group.key); }
function groupLabel(key, query) { return selectedGroups(query).find(group => group.key === key)?.label || key; }

function expandRangeCode(value) {
  const match = String(value).match(/^(\d{2})-(\d{2})$/);
  if (!match) return [String(value)];
  const start = Number(match[1]), end = Number(match[2]);
  const output = [];
  for (let n = start; n <= end; n += 1) output.push(String(n).padStart(2, "0"));
  return output;
}
function validateCustomToken(token) {
  if (/^\d{2,6}$/.test(token)) return { valid:true, canonical:token };
  const range = token.match(/^(\d{2})-(\d{2})$/);
  if (!range) return { valid:false, message:`“${token}” is not a valid 2–6 digit NAICS code or two-digit range.` };
  const start = Number(range[1]), end = Number(range[2]);
  if (start > end || end - start > 5) return { valid:false, message:`“${token}” must be an ascending two-digit range spanning no more than six sectors.` };
  return { valid:true, canonical:`${range[1]}-${range[2]}` };
}
function addCustomNaicsFromInput() {
  elements.naicsError.hidden = true;
  const tokens = unique(elements.customNaics.value.split(/[\s,;]+/).map(v => v.trim()).filter(Boolean));
  if (!tokens.length) return;
  for (const token of tokens) {
    const result = validateCustomToken(token);
    if (!result.valid) {
      elements.naicsError.textContent = result.message;
      elements.naicsError.hidden = false;
      return;
    }
    if (!state.customNaics.includes(result.canonical)) state.customNaics.push(result.canonical);
  }
  elements.customNaics.value = "";
  renderSelectedTags();
}

function renderIndustryDropdown(filter = "") {
  const needle = filter.trim().toLowerCase();
  const selected = new Set(state.selectedIndustryIds);
  const matchingGroups = INDUSTRY_GROUPS.map(group => ({
    group: group.group,
    items: group.items.filter(item => !needle || `${item.label} ${item.displayCode} ${item.codes.join(" ")}`.toLowerCase().includes(needle))
  })).filter(group => group.items.length);
  if (!matchingGroups.length) {
    elements.industryDropdown.innerHTML = '<div class="dropdown-empty">No preset industry matches this search.</div>';
    return;
  }
  elements.industryDropdown.innerHTML = matchingGroups.map(group => `
    <div class="dropdown-group-label">${escapeHtml(group.group)}</div>
    ${group.items.map(item => `<button class="dropdown-option ${selected.has(item.id) ? "selected" : ""}" type="button" data-industry-id="${item.id}" role="option" aria-selected="${selected.has(item.id)}"><span>${escapeHtml(item.label)}</span><span>${selected.has(item.id) ? "✓" : ""}</span></button>`).join("")}
  `).join("");
}
function openIndustryDropdown() {
  elements.industryDropdown.hidden = false;
  elements.industrySearch.setAttribute("aria-expanded", "true");
  renderIndustryDropdown(elements.industrySearch.value);
}
function closeIndustryDropdown() {
  elements.industryDropdown.hidden = true;
  elements.industrySearch.setAttribute("aria-expanded", "false");
}
function toggleIndustry(id) {
  const index = state.selectedIndustryIds.indexOf(id);
  if (index >= 0) state.selectedIndustryIds.splice(index, 1);
  else {
    if (state.selectedIndustryIds.length >= MAX_PRESET_INDUSTRIES) {
      elements.industryError.textContent = `Select up to ${MAX_PRESET_INDUSTRIES} preset industries. Use custom NAICS codes for additional precision.`;
      elements.industryError.hidden = false;
      return;
    }
    state.selectedIndustryIds.push(id);
  }
  elements.industryError.hidden = true;
  renderSelectedTags();
  renderIndustryDropdown(elements.industrySearch.value);
}
function renderSelectedTags() {
  elements.selectedIndustries.innerHTML = state.selectedIndustryIds.map(id => {
    const item = INDUSTRY_BY_ID[id];
    return `<span class="selection-tag">${escapeHtml(item.label)} — NAICS ${escapeHtml(item.displayCode)}<button class="tag-remove" type="button" data-remove-industry="${id}" aria-label="Remove ${escapeHtml(item.label)}">×</button></span>`;
  }).join("");
  elements.selectedCustomNaics.innerHTML = state.customNaics.map(code => `<span class="selection-tag custom">Custom NAICS ${escapeHtml(code)}<button class="tag-remove" type="button" data-remove-custom="${escapeHtml(code)}" aria-label="Remove custom NAICS ${escapeHtml(code)}">×</button></span>`).join("");
}

function renderOperations() {
  elements.operationOptions.innerHTML = OPERATIONS.map(operation => `<label class="check-card"><input type="checkbox" name="operations" value="${operation.id}" /><span>${escapeHtml(operation.label)}</span></label>`).join("");
}
function renderStates() {
  elements.regionPresets.innerHTML = `
    <button class="preset-button" type="button" data-preset="new-england">New England</button>
    <button class="preset-button" type="button" data-preset="clear">Clear</button>`;
  elements.stateOptions.innerHTML = NEW_ENGLAND_STATES.map(stateItem => `<label class="check-card"><input type="checkbox" name="states" value="${stateItem.code}" /><span><strong>${stateItem.code}</strong><br>${escapeHtml(stateItem.name)}</span></label>`).join("");
}
function setStatePreset(preset) {
  const values = preset === "new-england" ? new Set(NEW_ENGLAND_STATES.map(s => s.code)) : new Set();
  document.querySelectorAll('input[name="states"]').forEach(input => { input.checked = values.has(input.value); });
  updatePresetButtons();
}
function updatePresetButtons() {
  const selected = new Set(selectedCheckboxValues("states"));
  document.querySelectorAll("[data-preset]").forEach(button => {
    if (button.dataset.preset === "new-england") button.classList.toggle("active", selected.size === NEW_ENGLAND_STATES.length && NEW_ENGLAND_STATES.every(s => selected.has(s.code)));
    else button.classList.toggle("active", selected.size === 0);
  });
}
function renderLimits() {
  elements.limitOptions.innerHTML = [50,100,200,300].map(limit => `<div class="limit-option"><input id="limit-${limit}" type="radio" name="limit" value="${limit}" ${limit === 300 ? "checked" : ""} /><label for="limit-${limit}">${limit}</label></div>`).join("");
}

function buildQuery() {
  return {
    industryIds: [...state.selectedIndustryIds],
    customNaics: [...state.customNaics],
    operations: selectedCheckboxValues("operations"),
    states: selectedCheckboxValues("states"),
    includeKeywords: parseKeywords(elements.includeKeywords.value),
    excludeKeywords: parseKeywords(elements.excludeKeywords.value),
    limit: Number(document.querySelector('input[name="limit"]:checked')?.value || 300),
  };
}
function validateQuery(query) {
  const hasIndustries = query.industryIds.length > 0 || query.customNaics.length > 0;
  const hasStates = query.states.length > 0;
  elements.industryError.textContent = "Select at least one industry preset or add a custom NAICS code.";
  elements.industryError.hidden = hasIndustries;
  elements.stateError.hidden = hasStates;
  if (!hasIndustries) elements.industrySearch.scrollIntoView({behavior:"smooth", block:"center"});
  return hasIndustries && hasStates;
}

async function fetchJson(url, timeoutMs = 30000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { signal: controller.signal, headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } finally { clearTimeout(timer); }
}
function fetchJsonp(url, timeoutMs = 45000) {
  return new Promise((resolve, reject) => {
    const callbackName = `masconEcho_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const script = document.createElement("script");
    const timer = setTimeout(() => finish(new Error("Request timed out")), timeoutMs);
    function finish(error, data) {
      clearTimeout(timer);
      try { delete window[callbackName]; } catch (_) { window[callbackName] = undefined; }
      script.remove();
      error ? reject(error) : resolve(data);
    }
    window[callbackName] = data => finish(null, data);
    script.onerror = () => finish(new Error("JSONP request failed"));
    const parsed = new URL(url);
    parsed.searchParams.set("callback", callbackName);
    script.src = parsed.toString();
    document.head.appendChild(script);
  });
}
function setProgress(message) { elements.progressMessage.textContent = message; }
function setSourcePill(key, label, status) {
  let pill = elements.sourceStatus.querySelector(`[data-source-key="${key}"]`);
  if (!pill) {
    pill = document.createElement("span");
    pill.dataset.sourceKey = key;
    elements.sourceStatus.appendChild(pill);
  }
  pill.className = `source-pill ${status}`;
  pill.textContent = label;
}

function createDiagnostic(source, stateCode) {
  return { source, state: stateCode, returned:0, naicsMatched:0, active:0, operation:0, keywords:0, final:0, status:"Success", message:"" };
}
function formatSourceName(source, stateCode) { return stateCode ? `${source} — ${stateCode}` : source; }
function inferOperations(naicsCodes) {
  return OPERATIONS.filter(operation => naicsCodes.some(code => operation.prefixes.some(prefix => code.startsWith(prefix)))).map(operation => operation.id);
}
function recordText(record, query) {
  const industryLabels = record.groupKeys.map(key => groupLabel(key, query));
  return [record.companyName, record.parentCompanyName, record.locationName, record.businessType, record.address, record.city, record.state, record.zip, record.naicsCodes.join(" "), industryLabels.join(" ")].join(" ").toLowerCase();
}
function passesOperation(record, query) {
  if (!query.operations.length) return true;
  return record.operationIds.some(operation => query.operations.includes(operation));
}
function passesKeywords(record, query) {
  const text = recordText(record, query);
  if (query.includeKeywords.length && !query.includeKeywords.some(keyword => text.includes(keyword))) return false;
  if (query.excludeKeywords.some(keyword => text.includes(keyword))) return false;
  return true;
}

async function searchConnecticut(query) {
  const source = "Connecticut Business Registry";
  if (!query.states.includes("CT")) return { records:[], diagnostics:[], warnings:[], skipped:true };
  const groups = selectedGroups(query);
  const records = [];
  const diagnostics = [];
  const warnings = ["Connecticut NAICS values are self-reported. Records without a usable NAICS value are excluded."];
  const perGroupLimit = Math.min(1000, Math.max(250, Math.ceil(query.limit / Math.max(groups.length, 1)) * 6));

  for (const group of groups) {
    const diagnostic = createDiagnostic(source, `CT / ${group.displayCode}`);
    diagnostics.push(diagnostic);
    const codes = compressCodes(group.codes);
    const clauses = codes.map(code => `(naics_code like '%(${soqlEscape(code)}%' OR naics_code like '${soqlEscape(code)}%')`);
    if (!clauses.length) { diagnostic.status = "Skipped"; diagnostic.message = "No NAICS codes"; continue; }
    const where = `upper(status)='ACTIVE' AND upper(billingstate)='CT' AND (${clauses.join(" OR ")})`;
    const params = new URLSearchParams({
      "$select":"id,name,business_type,status,accountnumber,billingstreet,billingcity,billingstate,billingpostalcode,business_email_address,date_registration,naics_code",
      "$where":where,
      "$limit":String(perGroupLimit),
      "$order":"date_registration DESC"
    });
    try {
      const rows = await fetchJson(`https://data.ct.gov/resource/n7gp-d28j.json?${params}`);
      diagnostic.returned = rows.length;
      for (const row of rows) {
        const actualCodes = extractNaicsCodes(row.naics_code);
        if (!recordMatchesCodes(actualCodes, group.codes)) continue;
        diagnostic.naicsMatched += 1;
        if (clean(row.status).toUpperCase() !== "ACTIVE") continue;
        diagnostic.active += 1;
        const groupKeys = groupKeysForCodes(actualCodes, query);
        if (!groupKeys.length) continue;
        const record = {
          companyName: clean(row.name), parentCompanyName:"", locationName:"",
          groupKeys, naicsCodes:actualCodes, businessType:clean(row.business_type || row.naics_code),
          address:clean(row.billingstreet), city:clean(row.billingcity), state:"CT", zip:clean(row.billingpostalcode),
          phone:"", email:clean(row.business_email_address), contactPerson:"", website:"",
          companyStatus:"Active", registrationDate:clean(row.date_registration).slice(0,10),
          dataSources:[source], sourceRecordIds:[clean(row.accountnumber || row.id)],
          operationIds:inferOperations(actualCodes)
        };
        if (!record.companyName) continue;
        if (!passesOperation(record, query)) continue;
        diagnostic.operation += 1;
        if (!passesKeywords(record, query)) continue;
        diagnostic.keywords += 1;
        records.push(record);
      }
      diagnostic.final = records.filter(record => record.dataSources.includes(source) && record.groupKeys.includes(group.key)).length;
    } catch (error) {
      diagnostic.status = "Failed";
      diagnostic.message = error.name === "AbortError" ? "Timed out" : error.message;
    }
  }
  return { records, diagnostics, warnings, skipped:false };
}

function echoCompatibleCode(code) {
  const value = String(code);
  if (value.length === 3 || value.length === 5) return value.slice(0, value.length - 1);
  return value;
}
function echoFacilities(data) {
  const results = data?.Results || data?.results || data;
  return results?.Facilities || results?.facilities || [];
}
async function searchEcho(query) {
  const source = "EPA ECHO Active Facilities";
  const selectedCodes = allSelectedCodes(query);
  const echoCodes = compressCodes(selectedCodes.map(echoCompatibleCode));
  const records = [];
  const diagnostics = [];
  const warnings = ["EPA ECHO covers active facilities represented in EPA regulatory programs; it is not a complete registry of all businesses."];
  const chunks = [];
  for (let i=0; i<echoCodes.length; i+=15) chunks.push(echoCodes.slice(i, i+15));

  for (const stateCode of query.states) {
    const diagnostic = createDiagnostic(source, stateCode);
    diagnostics.push(diagnostic);
    try {
      for (const chunk of chunks) {
        const params = new URLSearchParams({
          output:"JSONP", p_st:stateCode, p_ncs:chunk.join(","), p_act:"Y", tablelist:"Y",
          responseset:String(Math.min(1000, Math.max(300, query.limit * 5))),
          qcolumns:"3,4,5,6,11,31,122,124"
        });
        const data = await fetchJsonp(`https://echodata.epa.gov/echo/echo_rest_services.get_facilities?${params}`);
        const facilities = echoFacilities(data);
        diagnostic.returned += facilities.length;
        for (const facility of facilities) {
          const actualCodes = extractNaicsCodes(firstField(facility, ["FacNaicsCodes","facNaicsCodes","CAANaics","CWANaics","RCRANaics"]));
          if (!recordMatchesCodes(actualCodes, selectedCodes)) continue;
          diagnostic.naicsMatched += 1;
          const activeFlag = firstField(facility, ["FacActiveFlag","facActiveFlag"]).toUpperCase();
          if (["N","NO","--","INACTIVE"].includes(activeFlag)) continue;
          diagnostic.active += 1;
          const federalFlag = firstField(facility, ["FacFederalFlg","facFederalFlg"]).toUpperCase();
          if (federalFlag === "Y" || federalFlag === "YES") continue;
          const groupKeys = groupKeysForCodes(actualCodes, query);
          if (!groupKeys.length) continue;
          const record = {
            companyName:firstField(facility,["FacName","facName"]), parentCompanyName:"", locationName:"",
            groupKeys, naicsCodes:actualCodes, businessType:"EPA-regulated operating facility",
            address:firstField(facility,["FacStreet","facStreet"]), city:firstField(facility,["FacCity","facCity"]),
            state:firstField(facility,["FacState","facState"]).toUpperCase(), zip:firstField(facility,["FacZip","facZip"]),
            phone:"", email:"", contactPerson:"", website:firstField(facility,["DfrUrl","dfrUrl"]),
            companyStatus:"Active", registrationDate:"", dataSources:[source],
            sourceRecordIds:[firstField(facility,["RegistryID","RegistryId","registryID","SourceID"])],
            operationIds:inferOperations(actualCodes)
          };
          if (!record.companyName || record.state !== stateCode) continue;
          if (!passesOperation(record, query)) continue;
          diagnostic.operation += 1;
          if (!passesKeywords(record, query)) continue;
          diagnostic.keywords += 1;
          records.push(record);
        }
      }
      diagnostic.final = records.filter(record => record.dataSources.includes(source) && record.state === stateCode).length;
    } catch (error) {
      diagnostic.status = "Failed";
      diagnostic.message = error.message;
    }
  }
  return { records, diagnostics, warnings, skipped:false };
}

function mergeRecords(records) {
  const merged = new Map();
  for (const record of records) {
    const key = sourceKey(record);
    if (!merged.has(key)) { merged.set(key, {...record, groupKeys:[...record.groupKeys], naicsCodes:[...record.naicsCodes], operationIds:[...record.operationIds], dataSources:[...record.dataSources], sourceRecordIds:[...record.sourceRecordIds]}); continue; }
    const existing = merged.get(key);
    for (const field of ["parentCompanyName","locationName","businessType","address","city","zip","phone","email","contactPerson","website","registrationDate"]) if (!existing[field] && record[field]) existing[field] = record[field];
    existing.groupKeys = unique([...existing.groupKeys, ...record.groupKeys]);
    existing.naicsCodes = unique([...existing.naicsCodes, ...record.naicsCodes]);
    existing.operationIds = unique([...existing.operationIds, ...record.operationIds]);
    existing.dataSources = unique([...existing.dataSources, ...record.dataSources]);
    existing.sourceRecordIds = unique([...existing.sourceRecordIds, ...record.sourceRecordIds]);
  }
  return [...merged.values()];
}
function sortRecords(a,b) {
  return (STATE_PRIORITY[a.state] || 99) - (STATE_PRIORITY[b.state] || 99) || a.state.localeCompare(b.state) || a.city.localeCompare(b.city) || a.companyName.localeCompare(b.companyName);
}
function balanceByIndustry(records, query) {
  const groups = selectedGroups(query);
  const queues = new Map(groups.map(group => [group.key, records.filter(record => record.groupKeys.includes(group.key)).sort(sortRecords)]));
  const output = [], used = new Set();
  while (output.length < query.limit) {
    let added = false;
    for (const group of groups) {
      const queue = queues.get(group.key) || [];
      while (queue.length) {
        const record = queue.shift();
        const key = sourceKey(record);
        if (used.has(key)) continue;
        used.add(key); output.push(record); added = true; break;
      }
      if (output.length >= query.limit) break;
    }
    if (!added) break;
  }
  if (output.length < query.limit) {
    for (const record of records.sort(sortRecords)) {
      const key = sourceKey(record);
      if (!used.has(key)) { used.add(key); output.push(record); }
      if (output.length >= query.limit) break;
    }
  }
  return output;
}
function finalizeRecords(records, query) {
  return balanceByIndustry(mergeRecords(records), query).map(record => ({
    ...record,
    industry:record.groupKeys.map(key => groupLabel(key, query)).join("; "),
    naicsCode:record.naicsCodes.join("; "),
    businessOperation:record.operationIds.map(id => OPERATION_BY_ID[id]?.label || id).join("; "),
    dataSource:record.dataSources.join("; "),
    sourceRecordId:record.sourceRecordIds.join("; ")
  }));
}

function resetOutputPanels() {
  elements.progressPanel.hidden = true;
  elements.errorPanel.hidden = true;
  elements.emptyPanel.hidden = true;
  elements.diagnosticsPanel.hidden = true;
  elements.resultsPanel.hidden = true;
  elements.sourceStatus.innerHTML = "";
  elements.warningList.innerHTML = "";
  elements.emptyWarningList.innerHTML = "";
}
function renderDiagnostics(diagnostics) {
  elements.diagnosticsPanel.hidden = false;
  elements.diagnosticsBody.innerHTML = diagnostics.map(item => {
    const statusClass = item.status === "Success" ? "status-ok" : item.status === "Failed" ? "status-failed" : "status-skipped";
    const title = escapeHtml(formatSourceName(item.source, item.state));
    const statusText = item.message ? `${item.status}: ${item.message}` : item.status;
    return `<tr><td>${title}</td><td>${item.returned}</td><td>${item.naicsMatched}</td><td>${item.active}</td><td>${item.operation}</td><td>${item.keywords}</td><td>${item.final}</td><td class="${statusClass}">${escapeHtml(statusText)}</td></tr>`;
  }).join("");
}
function renderWarnings(warnings, target) {
  target.innerHTML = unique(warnings).map(warning => `<div class="warning-item">${escapeHtml(warning)}</div>`).join("");
  target.hidden = !warnings.length;
}
function renderPreview(records) {
  const columns = [
    ["companyName","Company Name"],["industry","Industry"],["naicsCode","NAICS Code"],["businessOperation","Business Operation"],
    ["businessType","Business Type"],["address","Address"],["city","City"],["state","State"],["zip","ZIP"],
    ["phone","Phone"],["email","Email"],["contactPerson","Contact Person"],["website","Website"],
    ["companyStatus","Company Status"],["registrationDate","Registration Date"],["dataSource","Data Source"],["sourceRecordId","Source Record ID"]
  ];
  const preview = records.slice(0,10);
  elements.previewTable.innerHTML = `<thead><tr>${columns.map(([,label]) => `<th>${escapeHtml(label)}</th>`).join("")}</tr></thead><tbody>${preview.map(record => `<tr>${columns.map(([key]) => {
    const value = record[key] || "";
    if (key === "website" && /^https?:\/\//i.test(value)) return `<td><a href="${escapeHtml(value)}" target="_blank" rel="noopener">Open record</a></td>`;
    return `<td>${escapeHtml(value)}</td>`;
  }).join("")}</tr>`).join("")}</tbody>`;
}
function csvEscape(value) {
  const text = String(value ?? "");
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"','""')}"` : text;
}
function exportCsv() {
  if (!state.results.length) return;
  const fields = [
    ["companyName","Company Name"],["parentCompanyName","Parent Company Name"],["locationName","Location Name"],
    ["industry","Industry"],["naicsCode","NAICS Code"],["businessOperation","Business Operation"],["businessType","Business Type"],
    ["address","Address"],["city","City"],["state","State"],["zip","ZIP"],["phone","Phone"],["email","Email"],
    ["contactPerson","Contact Person"],["website","Website"],["companyStatus","Company Status"],["registrationDate","Registration Date"],
    ["dataSource","Data Source"],["sourceRecordId","Source Record ID"]
  ];
  const rows = [fields.map(([,label]) => csvEscape(label)).join(","), ...state.results.map(record => fields.map(([key]) => csvEscape(record[key] || "")).join(","))];
  const blob = new Blob(["\ufeff" + rows.join("\r\n")], {type:"text/csv;charset=utf-8"});
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  const industries = state.query.industryIds.map(id => INDUSTRY_BY_ID[id].label).slice(0,2).join("_").replace(/[^a-z0-9]+/gi,"-").replace(/^-|-$/g,"").toLowerCase() || "custom-naics";
  const states = state.query.states.join("-").toLowerCase();
  const date = new Date().toISOString().slice(0,10);
  link.download = `mascon_leads_${industries}_${states}_${date}.csv`;
  document.body.appendChild(link); link.click(); link.remove(); URL.revokeObjectURL(link.href);
}

async function runSearch(query) {
  resetOutputPanels();
  elements.progressPanel.hidden = false;
  elements.searchButton.disabled = true;
  state.query = query;
  const warnings = [];
  const diagnostics = [];
  const rawRecords = [];

  setProgress("Searching EPA ECHO across the selected New England states…");
  setSourcePill("echo", "EPA ECHO — searching", "running");
  const echoResult = await searchEcho(query);
  rawRecords.push(...echoResult.records); diagnostics.push(...echoResult.diagnostics); warnings.push(...echoResult.warnings);
  const echoFailed = echoResult.diagnostics.every(item => item.status === "Failed");
  setSourcePill("echo", echoFailed ? "EPA ECHO — failed" : `EPA ECHO — ${echoResult.records.length} records`, echoFailed ? "failed" : "success");

  setProgress("Searching the Connecticut Business Registry where applicable…");
  if (query.states.includes("CT")) {
    setSourcePill("ct", "Connecticut Registry — searching", "running");
    const ctResult = await searchConnecticut(query);
    rawRecords.push(...ctResult.records); diagnostics.push(...ctResult.diagnostics); warnings.push(...ctResult.warnings);
    const ctFailed = ctResult.diagnostics.every(item => item.status === "Failed");
    setSourcePill("ct", ctFailed ? "Connecticut Registry — failed" : `Connecticut Registry — ${ctResult.records.length} records`, ctFailed ? "failed" : "success");
  } else setSourcePill("ct", "Connecticut Registry — not selected", "skipped");

  setProgress("Merging duplicate locations and balancing industries…");
  const finalRecords = finalizeRecords(rawRecords, query);
  state.results = finalRecords;
  diagnostics.forEach(item => {
    if (item.status === "Success") item.final = finalRecords.filter(record => record.dataSources.includes(item.source) && (!/^[A-Z]{2}$/.test(item.state) || record.state === item.state)).length;
  });
  renderDiagnostics(diagnostics);

  const selectedNonCtStates = query.states.filter(code => code !== "CT");
  if (selectedNonCtStates.length) warnings.push(`For ${selectedNonCtStates.join(", ")}, the current broad source is EPA ECHO, so coverage is strongest for regulated physical facilities and industrial operations.`);
  if (!finalRecords.length) {
    elements.emptyPanel.hidden = false;
    renderWarnings(warnings, elements.emptyWarningList);
  } else {
    elements.resultsPanel.hidden = false;
    elements.resultsSummary.textContent = `${finalRecords.length} active business location${finalRecords.length === 1 ? "" : "s"} ready to export`;
    elements.sourceSummary.textContent = `States: ${query.states.join(", ")} · NAICS groups: ${selectedGroups(query).length} · Result limit: ${query.limit}`;
    renderWarnings(warnings, elements.warningList);
    renderPreview(finalRecords);
  }
  elements.progressPanel.hidden = true;
  elements.searchButton.disabled = false;
}

function resetForm() {
  state.selectedIndustryIds = [];
  state.customNaics = [];
  state.results = [];
  state.query = null;
  elements.form.reset();
  renderSelectedTags();
  setStatePreset("new-england");
  resetOutputPanels();
  elements.industryError.hidden = true;
  elements.naicsError.hidden = true;
  elements.stateError.hidden = true;
}

function bindEvents() {
  elements.industrySearch.addEventListener("focus", openIndustryDropdown);
  elements.industrySearch.addEventListener("input", () => { openIndustryDropdown(); renderIndustryDropdown(elements.industrySearch.value); });
  elements.industryToggle.addEventListener("click", () => elements.industryDropdown.hidden ? openIndustryDropdown() : closeIndustryDropdown());
  elements.industryDropdown.addEventListener("click", event => {
    const button = event.target.closest("[data-industry-id]");
    if (button) toggleIndustry(button.dataset.industryId);
  });
  document.addEventListener("click", event => { if (!event.target.closest("#industry-picker")) closeIndustryDropdown(); });
  elements.selectedIndustries.addEventListener("click", event => { const button = event.target.closest("[data-remove-industry]"); if (button) toggleIndustry(button.dataset.removeIndustry); });
  elements.selectedCustomNaics.addEventListener("click", event => { const button = event.target.closest("[data-remove-custom]"); if (button) { state.customNaics = state.customNaics.filter(code => code !== button.dataset.removeCustom); renderSelectedTags(); } });
  elements.addNaics.addEventListener("click", addCustomNaicsFromInput);
  elements.customNaics.addEventListener("keydown", event => { if (event.key === "Enter") { event.preventDefault(); addCustomNaicsFromInput(); } });
  elements.regionPresets.addEventListener("click", event => { const button = event.target.closest("[data-preset]"); if (button) setStatePreset(button.dataset.preset); });
  elements.stateOptions.addEventListener("change", updatePresetButtons);
  elements.form.addEventListener("submit", async event => {
    event.preventDefault();
    if (elements.customNaics.value.trim()) addCustomNaicsFromInput();
    const query = buildQuery();
    if (!validateQuery(query)) return;
    try { await runSearch(query); }
    catch (error) {
      elements.progressPanel.hidden = true;
      elements.searchButton.disabled = false;
      elements.errorPanel.hidden = false;
      elements.errorMessage.textContent = error?.message || "An unexpected error occurred.";
    }
  });
  elements.resetButton.addEventListener("click", resetForm);
  elements.exportButton.addEventListener("click", exportCsv);
}

function initialize() {
  renderOperations(); renderStates(); renderLimits(); renderSelectedTags(); bindEvents(); setStatePreset("new-england");
}
initialize();
