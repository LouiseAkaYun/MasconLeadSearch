# Official data references

## EPA ECHO

- Facility search: https://echo.epa.gov/facilities/facility-search
- Search criteria help: https://echo.epa.gov/help/facility-search/search-criteria-help
- Search results field guide: https://echo.epa.gov/help/facility-search/all-data-search-results-help
- REST service documentation: https://echo.epa.gov/system/files/ECHO%20All%20Data%20Search%20Services_v3.pdf

The app uses the public JSONP service at:

`https://echodata.epa.gov/echo/echo_rest_services.get_facilities`

Core parameters include `p_st`, `p_ncs`, `p_act=Y`, `tablelist=Y`, and `qcolumns` including `FacNaicsCodes`.

## Connecticut Business Registry

- Dataset page: https://data.ct.gov/Business/Connecticut-Business-Registry-Business-Master/n7gp-d28j
- API documentation: https://dev.socrata.com/foundry/data.ct.gov/n7gp-d28j
- JSON endpoint: https://data.ct.gov/resource/n7gp-d28j.json

## NAICS

- Census NAICS portal: https://www.census.gov/naics/
- 2022 NAICS manual: https://www.census.gov/naics/reference_files_tools/2022_NAICS_Manual.pdf
