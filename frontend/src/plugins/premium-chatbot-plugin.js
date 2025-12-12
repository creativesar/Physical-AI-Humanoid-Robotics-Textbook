// @ts-check

/**
 * This plugin ensures the premium chatbot root element is added to the DOM
 */
module.exports = function chatbotPlugin(context, options) {
  return {
    name: 'premium-chatbot-plugin',

    injectHtmlTags() {
      return {
        postBodyTags: [
          `<div id="premium-chatbot-container" style="position: fixed; bottom: 0; right: 0; z-index: 9999;"></div>`,
        ],
      };
    },
  };
};