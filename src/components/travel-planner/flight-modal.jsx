import React, { useState } from "react";
import { Plane, Calendar, Clock } from "lucide-react";

export function FlightModal({ isOpen, onClose }) {
  const [flightNumber, setFlightNumber] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");

  const handleSubmit = () => {
    console.log({
      flightNumber,
      departureDate,
      departureTime,
      arrivalDate,
      arrivalTime,
      departureAirport,
      arrivalAirport,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex items-center mb-4">
          <Plane className="mr-2 h-5 w-5" />
          <h2 className="text-lg font-bold">항공편 정보 추가</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="flightNumber" className="block text-sm font-medium mb-1">
              항공편명
            </label>
            <input
              id="flightNumber"
              placeholder="KE123"
              value={flightNumber}
              onChange={(e) => setFlightNumber(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label htmlFor="departureAirport" className="block text-sm font-medium mb-1">
              출발 공항
            </label>
            <input
              id="departureAirport"
              placeholder="인천국제공항 (ICN)"
              value={departureAirport}
              onChange={(e) => setDepartureAirport(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label htmlFor="arrivalAirport" className="block text-sm font-medium mb-1">
              도착 공항
            </label>
            <input
              id="arrivalAirport"
              placeholder="나리타국제공항 (NRT)"
              value={arrivalAirport}
              onChange={(e) => setArrivalAirport(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">출발 일시</label>
            <div className="flex space-x-2 items-center">
              <Calendar className="h-4 w-4 text-gray-500" />
              <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="border px-2 py-1 rounded"
              />
              <Clock className="h-4 w-4 text-gray-500 ml-2" />
              <input
                type="time"
                value={departureTime}
                onChange={(e) => setDepartureTime(e.target.value)}
                className="border px-2 py-1 rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">도착 일시</label>
            <div className="flex space-x-2 items-center">
              <Calendar className="h-4 w-4 text-gray-500" />
              <input
                type="date"
                value={arrivalDate}
                onChange={(e) => setArrivalDate(e.target.value)}
                className="border px-2 py-1 rounded"
              />
              <Clock className="h-4 w-4 text-gray-500 ml-2" />
              <input
                type="time"
                value={arrivalTime}
                onChange={(e) => setArrivalTime(e.target.value)}
                className="border px-2 py-1 rounded"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-sm rounded hover:bg-gray-300"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
          >
            추가하기
          </button>
        </div>
      </div>
    </div>
  );
}
