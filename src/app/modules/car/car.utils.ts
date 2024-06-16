export const priceCalculate = (booking: Partial<any>, endTime: string) => {
  const start = new Date(`1970-01-01T${booking?.startTime}:00`)
  const end = endTime
    ? new Date(`1970-01-01T${endTime}:00`)
    : new Date()
  const diffMs = end.getTime() - start.getTime()
  const diffHours = diffMs / 1000 / 60 / 60
  const totalCost = diffHours * booking?.car?.pricePerHour

  return totalCost
}
