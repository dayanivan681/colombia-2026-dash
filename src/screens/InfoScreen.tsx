import { Plane, Home as HomeIcon, MapPin, Info, Phone, Mail } from 'lucide-react';
import { tripData } from '../data/tripData';

export default function InfoScreen() {
  return (
    <div className="space-y-6 pb-8">
      <h2 className="text-2xl font-semibold px-2 mb-2">Trip Info</h2>

      {/* Flights */}
      <section>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-forest-900/50 mb-3 px-2 flex items-center">
          <Plane size={16} className="mr-2" /> Flights
        </h3>
        <div className="glass-panel rounded-2xl p-5 space-y-5">
          <div className="flex justify-between items-center border-b border-beige-200/50 pb-3">
            <div>
              <p className="text-xs text-forest-900/50 font-medium uppercase">Booking Code</p>
              <p className="text-lg font-bold tracking-widest">{tripData.flights.bookingCode}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-forest-900/50 font-medium uppercase">Passengers</p>
              <p className="text-sm font-semibold">Dayan & Frances</p>
            </div>
          </div>

          <FlightLeg flight={tripData.flights.outbound} type="Outbound" />
          <FlightLeg flight={tripData.flights.return} type="Return" />

          <div className="bg-beige-100 rounded-xl p-4 mt-2">
            <h4 className="text-xs font-bold uppercase mb-2">Baggage Rules (Light Fare)</h4>
            <ul className="text-sm space-y-1 text-forest-900/80 list-disc pl-4">
              <li>Included: {tripData.flights.baggage.included}</li>
              <li>Checked: {tripData.flights.baggage.checked}</li>
              <li>Plan: <span className="font-semibold">{tripData.flights.baggage.plan}</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* Airbnb */}
      <section>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-forest-900/50 mb-3 px-2 mt-8 flex items-center">
          <HomeIcon size={16} className="mr-2" /> Accommodation
        </h3>
        <div className="glass-panel rounded-2xl p-5 space-y-4">
          <div>
            <h4 className="text-lg font-semibold">{tripData.airbnb.name}</h4>
            <p className="text-sm text-forest-900/70 mt-1">{tripData.airbnb.address}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 border-y border-beige-200/50 py-3">
            <div>
              <p className="text-xs text-forest-900/50 font-medium">Check-in</p>
              <p className="text-sm font-semibold">{tripData.airbnb.checkIn}</p>
            </div>
            <div>
              <p className="text-xs text-forest-900/50 font-medium">Checkout</p>
              <p className="text-sm font-semibold">{tripData.airbnb.checkOut}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Host: {tripData.airbnb.host}</p>
            <div className="flex space-x-3">
              <a href={`https://maps.google.com/?q=${tripData.airbnb.address}`} target="_blank" rel="noreferrer" className="flex-1 bg-forest-900 text-white text-center text-sm font-medium py-2 rounded-lg flex justify-center items-center">
                <MapPin size={16} className="mr-2" /> Maps
              </a>
              <a href={`https://wa.me/${tripData.airbnb.hostPhone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="flex-1 bg-green-600 text-white text-center text-sm font-medium py-2 rounded-lg flex justify-center items-center">
                <Phone size={16} className="mr-2" /> WhatsApp
              </a>
            </div>
          </div>

          <div className="bg-beige-100 rounded-xl p-4">
            <h4 className="text-xs font-bold uppercase mb-2 flex items-center"><Info size={14} className="mr-1"/> Rules & Notes</h4>
            <ul className="text-sm space-y-1 text-forest-900/80 list-disc pl-4">
              {tripData.airbnb.rules.map((rule, idx) => (
                <li key={idx}>{rule}</li>
              ))}
              <li className="text-gold-500 font-medium mt-2 list-none -ml-4 flex items-start">
                <span className="mr-2">🎁</span> {tripData.airbnb.bonus}
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contacts */}
      <section>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-forest-900/50 mb-3 px-2 mt-8 flex items-center">
          <Phone size={16} className="mr-2" /> Contacts
        </h3>
        <div className="space-y-3">
          {tripData.contacts.map((contact, idx) => (
            <div key={idx} className="glass-panel rounded-2xl p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-base font-semibold">{contact.name}</h4>
                  <p className="text-xs text-forest-900/50 font-medium">{contact.role}</p>
                </div>
                <div className="flex space-x-2">
                  <a href={`https://wa.me/${contact.phone.replace(/[^0-9]/g, '')}`} className="bg-green-100 text-green-700 p-2 rounded-full">
                    <Phone size={16} />
                  </a>
                  {contact.email && (
                    <a href={`mailto:${contact.email}`} className="bg-beige-200 text-forest-900 p-2 rounded-full">
                      <Mail size={16} />
                    </a>
                  )}
                </div>
              </div>
              
              {contact.notes.length > 0 && (
                <ul className="mt-3 space-y-1 text-xs text-forest-900/70 list-disc pl-4">
                  {contact.notes.map((note, nIdx) => (
                    <li key={nIdx}>{note}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function FlightLeg({ flight, type }: { flight: any, type: string }) {
  return (
    <div className="relative">
      <h4 className="text-xs font-bold uppercase text-gold-500 mb-2">{type} - {flight.date}</h4>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xl font-bold">{flight.depart}</p>
          <p className="text-sm font-medium text-forest-900/60">{flight.route.split('→')[0].trim()}</p>
        </div>
        <div className="flex-1 px-4 relative flex items-center justify-center">
          <div className="absolute w-full h-[1px] bg-beige-200"></div>
          <Plane size={16} className="text-gold-400 rotate-90 relative bg-white px-1 w-6 h-6" />
        </div>
        <div className="text-right">
          <p className="text-xl font-bold">{flight.arrive}</p>
          <p className="text-sm font-medium text-forest-900/60">{flight.route.split('→')[1].trim()}</p>
        </div>
      </div>
      <div className="mt-2 text-xs text-forest-900/50 font-medium flex justify-between">
        <span>{flight.airline} {flight.flightNo}</span>
        <span>{flight.duration}</span>
        {flight.terminal && <span>{flight.terminal}</span>}
      </div>
    </div>
  );
}
