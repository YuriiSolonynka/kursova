import React from "react";

export default function LoyaltyTab({ loyaltyCard }) {
    return (
        <div>
            <h1 className="text-4xl font-bold text-white mb-12">Loyalty Points</h1>
            <div className="bg-gray-900 rounded-lg p-8 border border-gray-800 max-w-3xl">
                {/* Баланс */}
                <div className="text-center mb-8">
                    <p className="text-gray-400 mb-2">Your Current Balance</p>
                    <p className="text-6xl font-bold text-blue-400 mb-4">{loyaltyCard.bonusPoints || 0}</p>
                    <p className="text-gray-400">points</p>
                </div>

                {/* Історія */}
                <div className="border-t border-gray-800 pt-8">
                    <h3 className="text-xl font-semibold text-white mb-6">Recent Activity</h3>
                    {loyaltyCard.bonusHistory?.length > 0 ? (
                        <div className="space-y-4">
                            {loyaltyCard.bonusHistory.map((item, index) => (
                                <div key={index} className="flex justify-between text-gray-300">
                                    <span>{item.points > 0 ? `+${item.points}` : item.points} points</span>
                                    {new Date(item.date).toLocaleDateString("en-GB")}{" "}
                                    {new Date(item.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No bonus activity yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
