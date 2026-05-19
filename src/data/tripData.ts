export const tripData = {
  destination: "Medellín, Colombia",
  dates: "May 24–28, 2026",
  nights: 4,
  travelers: ["Dayan Correa Sanabria", "Frances Durand Sein"],
  area: "Provenza / El Poblado",
  airbnb: {
    name: "Blux Loft",
    address: "Calle 12 #30-126, Edificio Blux, Apt 1401, Barrio Las Lomas",
    checkIn: "Sunday May 24, 3:00 PM",
    checkOut: "Thursday May 28, 12:00 PM",
    paid: "$326.30 USD",
    confirmation: "HM4NW5Z4DF",
    host: "Catalina",
    hostPhone: "+57 305 216 5486",
    rules: [
      "Pool 9 AM–9 PM, closed Mondays, no food",
      "Gym 6 AM–9 PM",
      "Quiet hours 10 PM",
      "Passport required at reception",
      "Hot water: left faucet, takes a few minutes"
    ],
    bonus: "1 free MAMM ticket, ask Catalina by chat"
  },
  flights: {
    bookingCode: "AINFSJ",
    outbound: {
      airline: "Avianca",
      flightNo: "AV231",
      route: "SJU → MDE",
      date: "Sunday May 24, 2026",
      depart: "4:40 PM",
      arrive: "6:25 PM",
      duration: "2h 45m",
      terminal: "Terminal D at SJU"
    },
    return: {
      airline: "Avianca",
      flightNo: "AV230",
      route: "MDE → SJU",
      date: "Thursday May 28, 2026",
      depart: "11:30 AM",
      arrive: "3:15 PM",
      duration: "2h 45m"
    },
    baggage: {
      fare: "LIGHT",
      included: "1 carry-on 10 kg + 1 personal item",
      checked: "0",
      plan: "buy 1 checked bag only for return MDE → SJU",
      estimatedReturnBag: "$80 USD total for return only"
    }
  },
  contacts: [
    {
      name: "Juan",
      role: "Transportation MDE",
      phone: "+57 300 413 0001",
      email: "juancrisostomo121@gmail.com",
      notes: [
        "Full day package 9 AM–5 PM: 400,000 COP approx $107 USD",
        "Hourly rate: 45,000 COP approx $12 USD",
        "Door-to-door service"
      ]
    },
    {
      name: "Catalina",
      role: "Airbnb Host",
      phone: "+57 305 216 5486",
      notes: []
    }
  ],
  budget: {
    initialExpenses: [
      { id: "1", name: "Flights (2 pax)", amountUSD: 407.88, amountCOP: 0 },
      { id: "2", name: "Airbnb", amountUSD: 326.30, amountCOP: 0 },
      { id: "3", name: "Ange Experience Mirador Tour", amountUSD: 95, amountCOP: 350000 },
      { id: "4", name: "Comuna 13 Balance", amountUSD: 28, amountCOP: 110000 },
      { id: "5", name: "Return Checked Bag (Est.)", amountUSD: 80, amountCOP: 0 },
    ]
  },
  schedule: [
    {
      id: "day1",
      dateStr: "2026-05-24",
      displayDate: "Sunday May 24",
      theme: "Arrival",
      activities: [
        { time: "4:40 PM", title: "Avianca AV231 departs SJU", type: "transit" },
        { time: "6:25 PM", title: "Arrives MDE", type: "transit" },
        { time: "7:10–7:30 PM", title: "Uber to Blux Loft", type: "transit" },
        { time: "9:15 PM", title: "Cannario Rooftop dinner/drinks", type: "food", notes: "flexible depending on energy", optional: true }
      ]
    },
    {
      id: "day2",
      dateStr: "2026-05-25",
      displayDate: "Monday May 25",
      theme: "Comuna 13 + Night",
      activities: [
        { time: "8:30 AM", title: "Pergamino or Café Velvet", type: "food" },
        { time: "10:30 AM", title: "Walk Manila / Provenza", type: "activity" },
        { time: "11:45 AM", title: "Light lunch", type: "food" },
        { time: "12:30 PM", title: "Leave to meeting point", type: "transit" },
        { time: "1:30 PM", title: "Comuna 13 Tour with Discovering Colombia", type: "activity", main: true, notes: "Reserved. Meeting point Cra. 70 #45e-93, Laureles-Estadio. $25 USD per person. Balance pending 110,000 COP. Includes metro + bus, coffee museum, guide. Approx 4 hours." },
        { time: "6:00 PM", title: "Return to loft", type: "transit" },
        { time: "8:00 PM", title: "Dinner at Carolina", type: "food" },
        { time: "10:30 PM", title: "La Oculta", type: "activity", optional: true }
      ]
    },
    {
      id: "day3",
      dateStr: "2026-05-26",
      displayDate: "Tuesday May 26",
      theme: "Centro + Mirador",
      activities: [
        { time: "8:00 AM", title: "Pergamino", type: "food" },
        { time: "9:30 AM", title: "El Hueco + Plaza Botero", type: "activity" },
        { time: "12:30 PM", title: "Local lunch", type: "food" },
        { time: "2:00 PM", title: "Return to loft + rest", type: "activity" },
        { time: "5:00 PM", title: "Ange Experience Mirador Tour", type: "activity", main: true, notes: "Private, preferred option La Palma/Las Palmas, approx 4 hours, confirm pickup at Blux Loft, approx 350,000 COP or $90–$100 total. Alternative: Coordinate transportation with Juan to Mirador Las Palmas and/or Mirador El Cielo." },
        { time: "9:15 PM", title: "Light dinner / La Matriarca", type: "food", optional: true },
        { time: "10:30 PM", title: "Premium quiet cocktails", type: "activity", notes: "Lounge/cocktail bar in Provenza or El Poblado", optional: true }
      ]
    },
    {
      id: "day4",
      dateStr: "2026-05-27",
      displayDate: "Wednesday May 27",
      theme: "Tattoo + Business + Night",
      activities: [
        { time: "8:45 AM", title: "Rituales Café", type: "food" },
        { time: "10:30 AM", title: "Tattoo at Main Galerie", type: "activity", link: "https://www.instagram.com/main.galerie?igsh=bHdwYXNvN3hlaXg5", notes: "Small/medium tattoo recommended. Confirm appointment, design, price and time estimate. Optional if time allows: MAMM with Airbnb ticket or Museo El Castillo." },
        { time: "12:30 PM", title: "Lunch + return to loft", type: "food" },
        { time: "2:00 PM", title: "Frances Biz Opportunity", type: "activity", main: true },
        { time: "7:00 PM", title: "Envy Rooftop", type: "activity" },
        { time: "8:45 PM", title: "Carmen or El Cielo", type: "food" },
        { time: "10:30 PM", title: "Callejón del Gato", type: "activity", notes: "only if there is energy", optional: true }
      ]
    },
    {
      id: "day5",
      dateStr: "2026-05-28",
      displayDate: "Thursday May 28",
      theme: "Departure",
      activities: [
        { time: "7:30 AM", title: "Pergamino + coffee beans for home", type: "food" },
        { time: "8:45–9:00 AM", title: "Checkout + Uber to airport", type: "transit" },
        { time: "11:30 AM", title: "Avianca AV230 MDE → SJU", type: "transit" },
        { time: "3:15 PM", title: "Arrive SJU", type: "transit" }
      ]
    }
  ]
};
