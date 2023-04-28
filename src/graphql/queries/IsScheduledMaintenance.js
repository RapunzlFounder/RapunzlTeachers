export const IS_SCHEDULED_MAINTENANCE = `
query{
  isScheduledMaintenance
   {
    isMaintenance
    startDate
    startTime
    endDate
    endTime
  }
}
`;
