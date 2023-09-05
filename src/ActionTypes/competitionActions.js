export const WEBSOCKET_COMPETITION_UPDATE = 'WEBSOCKET_COMPETIION_UPDATE';

export const websocketCompetitionUpdate = (participantInfo, portfolioType) => ({
    type: WEBSOCKET_COMPETITION_UPDATE,
    participantInfo,
    portfolioType
  });