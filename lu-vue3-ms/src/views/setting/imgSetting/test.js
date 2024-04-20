const arr = []
export const getDevs = () => {
  for (let i = 0; i < 46; i++) {
    arr.push({
      equipmentId: i,
      equipmentName: "设备" + (i + 1),
      equipmentCode: Math.round(Math.random() * 10000000),
      latlog: `${Math.random() * 100}, ${Math.random() * 100}`,
      quantity: +(Math.random() * 100).toFixed(2),
      status: Math.random() < 0.5 ? "异常" : "正常"
    })
  }
  return arr
}   