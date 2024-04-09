const settings = {
  "name": "ahmv-frontity",
  "state": {
    "frontity": {
      "url": "https://arrowheadhomesmv.artlyticalmedia.com",
      "title": "Arrowhead Homes MV",
      "description": "We are a family owned and operated business specializing in premium modular homes, renovation and real estate. The company is based on Martha's Vineyard."
    }
  },
  "packages": [
    {
      "name": "arrowhead-homes-mv-theme",
      "state": {
        "theme": {}
      }
    },
    {
      "name": "@frontity/wp-source",
      "state": {
        "source": {
          api: "https://arrowheadhomesmv.artlyticalmedia.com/wp-json",
          homepage: "/projects/",
          postTypes: [
            {
              type: "project",
              endpoint: "project",
              archive: '/projects'
            }
          ]
        }
      }
    },
    "@frontity/tiny-router",
    "@frontity/html2react",
    "frontity-contact-form-7",
    "@frontity/yoast"
  ]
};

export default settings;
