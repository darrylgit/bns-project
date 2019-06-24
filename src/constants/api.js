const BASE_API = "https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi";
const BASE_SERIES_QUERY = "q=''-!1900,2019-!0,5-!0,10-!0-!Series-!Any-!Any-!gt1-!{downloadable}&t=ns&cl=78&st=adv&ob=Relevance&p=1&sa=and";

export const API_CONSTANT_MAP = {
  'series': BASE_API+'?'+BASE_SERIES_QUERY
};

export const API_CONSTANT_HEADERS = {
	'headers':{
		'Content-Type': 'application/json',
		'X-RapidAPI-HOST': 'unogs-unogs-v1.p.rapidapi.com',
		'X-RapidAPI-KEY': '9fd6f06704mshf8464cc64fe8617p18526djsna6f1bae860d4'
	}
};