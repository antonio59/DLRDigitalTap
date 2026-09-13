export type DlrStation = {
  name: string
  zone: 1 | 2 | 3 | 4
}

export const DLR_STATIONS: DlrStation[] = [
  { name: "Abbey Road", zone: 3 },
  { name: "All Saints", zone: 2 },
  { name: "Bank", zone: 1 },
  { name: "Beckton", zone: 3 },
  { name: "Beckton Park", zone: 3 },
  { name: "Blackwall", zone: 2 },
  { name: "Bow Church", zone: 2 },
  { name: "Canning Town", zone: 2 },
  { name: "Canary Wharf", zone: 2 },
  { name: "Crossharbour", zone: 2 },
  { name: "Custom House", zone: 3 },
  { name: "Cutty Sark", zone: 2 },
  { name: "Cyprus", zone: 3 },
  { name: "Deptford Bridge", zone: 2 },
  { name: "Devons Road", zone: 2 },
  { name: "East India", zone: 2 },
  { name: "Elverson Road", zone: 2 },
  { name: "Gallions Reach", zone: 3 },
  { name: "Greenwich", zone: 2 },
  { name: "Heron Quays", zone: 2 },
  { name: "Island Gardens", zone: 2 },
  { name: "King George V", zone: 3 },
  { name: "Langdon Park", zone: 2 },
  { name: "Lewisham", zone: 2 },
  { name: "Limehouse", zone: 2 },
  { name: "London City Airport", zone: 3 },
  { name: "Mudchute", zone: 2 },
  { name: "Pontoon Dock", zone: 3 },
  { name: "Poplar", zone: 2 },
  { name: "Prince Regent", zone: 3 },
  { name: "Pudding Mill Lane", zone: 2 },
  { name: "Royal Albert", zone: 3 },
  { name: "Royal Victoria", zone: 3 },
  { name: "Shadwell", zone: 2 },
  { name: "South Quay", zone: 2 },
  { name: "Stratford", zone: 2 },
  { name: "Stratford High Street", zone: 3 },
  { name: "Stratford International", zone: 2 },
  { name: "Tower Gateway", zone: 1 },
  { name: "West India Quay", zone: 2 },
  { name: "West Silvertown", zone: 3 },
  { name: "Westferry", zone: 2 },
  { name: "Woolwich Arsenal", zone: 4 },
]

export type InterchangeStation = {
  name: string
  lines: string[]
}

export const INTERCHANGE_STATIONS: InterchangeStation[] = [
  { name: "Blackhorse Road", lines: ["Victoria line", "London Overground"] },
  { name: "Canada Water", lines: ["Jubilee line", "London Overground"] },
  { name: "Clapham Junction", lines: ["National Rail", "London Overground"] },
  { name: "Ealing Broadway", lines: ["Central line", "District line", "Elizabeth line", "National Rail"] },
  { name: "Gospel Oak", lines: ["London Overground"] },
  { name: "Gunnersbury", lines: ["District line", "London Overground"] },
  { name: "Hackney Central", lines: ["London Overground"] },
  { name: "Hackney Downs", lines: ["London Overground", "National Rail"] },
  { name: "Highbury & Islington", lines: ["Victoria line", "London Overground"] },
  { name: "Kensington (Olympia)", lines: ["District line", "London Overground"] },
  { name: "Rayners Lane", lines: ["Metropolitan line", "Piccadilly line"] },
  { name: "Richmond", lines: ["District line", "London Overground", "National Rail"] },
  { name: "Stratford", lines: ["Central line", "Jubilee line", "Elizabeth line", "DLR", "London Overground", "National Rail"] },
  { name: "Surrey Quays", lines: ["London Overground"] },
  { name: "West Brompton", lines: ["District line", "London Overground"] },
  { name: "Whitechapel", lines: ["District line", "Hammersmith & City line", "Elizabeth line", "London Overground"] },
  { name: "Willesden Junction", lines: ["Bakerloo line", "London Overground"] },
  { name: "Wimbledon", lines: ["District line", "National Rail", "Tram"] },
]

/** Illustrative adult PAYG peak-style fare. Not official TfL pricing. */
export function estimateDlrFare(fromName: string, toName: string): number {
  const from = DLR_STATIONS.find((s) => s.name === fromName)
  const to = DLR_STATIONS.find((s) => s.name === toName)
  if (!from || !to) return 2.8

  const maxZone = Math.max(from.zone, to.zone)
  const touchesZone1 = from.zone === 1 || to.zone === 1

  if (maxZone === 1) return 2.8
  if (touchesZone1 && maxZone === 2) return 3.5
  if (touchesZone1 && maxZone === 3) return 3.8
  if (touchesZone1 && maxZone === 4) return 4.3
  if (maxZone === 2) return 2.1
  if (maxZone === 3) return 2.8
  return 3.0
}
