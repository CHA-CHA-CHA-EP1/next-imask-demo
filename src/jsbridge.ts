export const internalPartnerInitAuth = (
  controlStepFlow: string,
  navigateFlow: string,
): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    window.bridge = {
      internalPartnerInitAuthCallback: (authorizationCode: string) => {
        resolve(authorizationCode);
      },
      internalPartnerInitAuthCallbackError: (
        errorCode: string,
        errorDescription: string,
      ) => {
        reject({ errorCode, errorDescription });
      },
    };

    if (window.JSBridge) {
      window.bridge.internalPartnerInitAuthCallback = resolve;
      window.bridge.internalPartnerInitAuthCallbackError = reject;
      window.JSBridge.internalPartnerInitAuth?.(controlStepFlow, navigateFlow);
    } else if (window.webkit) {
      window.bridge.internalPartnerInitAuthCallback = resolve;
      window.bridge.internalPartnerInitAuthCallbackError = reject;
      window.webkit.messageHandlers.observer.postMessage({
        name: "internalPartnerInitAuth",
        controlStepFlow,
        navigateFlow,
      });
    } else {
      reject({
        errorCode: "NO_JSBRIDGE",
        errorDescription: "No JSBridge found on window object",
      });
    }
  });
};

