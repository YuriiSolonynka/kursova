export default function MembershipsTab({ currentPlan, membershipPlans, onBuyMembership, profile }) {

    const getFinalPrice = (plan) => {
        if (profile?.phone && profile.phone.trim() !== "") {
            return (plan.price * 0.95).toFixed(2);
        }
        return plan.price;
    };

    const handleChoosePlan = async (plan) => {
        if (currentPlan?.plan.toString() === plan._id.toString()) {
            alert("This is your current plan.");
            return;
        }

        const confirm = window.confirm(`Do you want to subscribe to the ${plan.name} plan for $${getFinalPrice(plan)}/month?`);
        if (!confirm) return;

        try {
            await onBuyMembership(plan._id);
        } catch (err) {
            console.error(err);
            alert("Failed to subscribe. Try again.");
        }
    };

    return (
        <div>
            <h1 className="text-4xl font-bold text-white mb-12">My Subscriptions</h1>

            {currentPlan ? (
                <div className="bg-green-700 p-6 rounded-lg mb-8 max-w-2xl">
                    <span className="text-white font-semibold text-lg">Current Plan: </span>
                    <span className="text-white text-xl font-bold">{currentPlan.planName}</span>
                    <p className="text-gray-200">
                        Valid until: {new Date(currentPlan.endDate).toLocaleDateString()}
                    </p>
                </div>
            ) : (
                <p className="text-gray-500 mb-8">You have no active subscriptions.</p>
            )}

            <h2 className="text-3xl font-bold text-white mt-12 mb-8">Available Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {membershipPlans.map(plan => (
                    <div
                        key={plan._id}
                        className={`rounded-lg p-8 border transition-all ${plan.highlighted ? "bg-blue-600 border-blue-500 transform scale-105" : "bg-gray-900 border-gray-800"}`}
                    >
                        {plan.highlighted && (
                            <div className="text-center mb-4">
                                <span className="inline-block px-4 py-1 bg-blue-500 text-white text-sm rounded-full">
                                    Most Popular
                                </span>
                            </div>
                        )}
                        <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                        <p className="text-3xl font-bold text-white mb-6">
                            {profile?.phone
                                ? <>
                                    <span className="line-through text-gray-500 mr-2">${plan.price}</span>
                                    <span className="text-green-400 font-bold">${getFinalPrice(plan)}</span>
                                </>
                                : `$${plan.price}`}
                        </p>

                        <ul className="space-y-3 mb-8">
                            {plan.features.map((feature, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <svg
                                        className={`w-5 h-5 mt-0.5 flex-shrink-0 ${plan.highlighted ? "text-white" : "text-blue-400"}`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span className={plan.highlighted ? "text-white" : "text-gray-300"}>{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={() => handleChoosePlan(plan)}
                            className={`w-full px-6 py-3 rounded-lg font-medium transition-colors ${currentPlan?.plan.toString() === plan._id.toString()
                                ? "bg-gray-500 text-white cursor-not-allowed"
                                : plan.highlighted
                                    ? "bg-white text-blue-600 hover:bg-gray-100"
                                    : "bg-blue-600 text-white hover:bg-blue-700"
                                }`}
                        >
                            {currentPlan?.plan.toString() === plan._id.toString() ? "Current Plan" : "Choose Plan"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
