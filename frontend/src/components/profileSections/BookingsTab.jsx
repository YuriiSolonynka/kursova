import React from "react";

export default function BookingsTab({ bookings, handleCancelBooking, getStatusColor }) {
    return (
        <div>
            <h1 className="text-4xl font-bold text-white mb-12">My Bookings</h1>

            <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-800">
                            <th className="text-left px-6 py-4 text-gray-400 font-medium">Date</th>
                            <th className="text-left px-6 py-4 text-gray-400 font-medium">Section</th>
                            <th className="text-left px-6 py-4 text-gray-400 font-medium">Time</th>
                            <th className="text-left px-6 py-4 text-gray-400 font-medium">Status</th>
                            <th className="text-left px-6 py-4 text-gray-400 font-medium">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {bookings.length > 0 ? (
                            bookings.map((booking) => (
                                <tr
                                    key={booking._id}
                                    className="border-b border-gray-800 hover:bg-gray-800 transition-colors"
                                >
                                    <td className="px-6 py-4 text-gray-300">
                                        {new Date(booking.date).toLocaleDateString()}
                                    </td>

                                    <td className="px-6 py-4 text-white">
                                        {booking.section?.name || "N/A"}
                                    </td>

                                    <td className="px-6 py-4 text-gray-300">
                                        {booking.time}
                                    </td>

                                    <td className={`px-6 py-4 font-medium ${getStatusColor(booking.status)}`}>
                                        {booking.status}
                                    </td>

                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleCancelBooking(booking._id)}
                                            disabled={booking.status === "canceled"}
                                            className={`font-medium ${booking.status === "canceled"
                                                    ? "text-gray-500 cursor-not-allowed"
                                                    : "text-red-500 hover:text-red-400"
                                                }`}
                                        >
                                            Cancel
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-8 text-gray-500">
                                    You have no bookings yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
