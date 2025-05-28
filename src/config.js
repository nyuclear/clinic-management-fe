let config = {
    API_BASE_URL: '',
  };
  
  export const loadConfig = async () => {
    const res = await fetch('/config.json');
    const data = await res.json();
    config = data;
  };
  
  export const getConfig = () => config;
  