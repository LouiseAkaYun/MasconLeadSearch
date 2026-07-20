# Government data sources used in Version 1

## Connecticut Business Registry

- Dataset: Connecticut Business Registry — Business Master
- Dataset ID: `n7gp-d28j`
- API base: `https://data.ct.gov/resource/n7gp-d28j.json`
- Status rule: `status = Active`
- Useful fields: company name, business type, address, email, registration date, NAICS code.
- Limitation: NAICS is self-reported and is not present for every business.

## New York Active Corporations

- Dataset: Active Corporations: Beginning 1800
- Dataset ID: `n9v6-gdp6`
- API base: `https://data.ny.gov/resource/n9v6-gdp6.json`
- Status rule: the dataset itself contains active corporations.
- Useful fields: entity name, entity type, filing date, location/process address, chairman name.
- Limitation: no NAICS code; the tool uses company-name keywords to infer selected industry.

## NPPES NPI Registry

- API base: `https://npiregistry.cms.hhs.gov/api/`
- Version: `2.1`
- Status rule: organizational NPI (`NPI-2`) with `basic.status = A`.
- Useful fields: organization name, taxonomy, location address, phone, authorized official, enumeration date.
- Limitation: only healthcare providers represented in NPPES.

## EPA ECHO

- API base: `https://echodata.epa.gov/echo/echo_rest_services.get_facilities`
- Status rule: `p_act=Y` and `FacActiveFlag=Y`.
- Federal facilities are excluded when the source flag is available.
- Useful fields: facility name, physical address, facility-level NAICS, active flag, registry ID.
- Limitation: covers regulated facilities, not every private business.

## FMCSA QCMobile

- API base: `https://mobile.fmcsa.dot.gov/qc/services/carriers/name/`
- Authentication: free `FMCSA_WEB_KEY` stored in Netlify.
- Status rule: `allowToOperate=Y` and not out of service.
- Useful fields: legal/DBA name, physical address, phone, USDOT number.
- Limitation: carrier-name search returns up to 50 results per keyword and is not a complete state bulk list.
