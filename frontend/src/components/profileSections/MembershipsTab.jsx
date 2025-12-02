import { useState, useEffect } from "react";
import { X, Check } from "lucide-react";

function PurchaseModal({ isOpen, onClose, plan, onConfirm, allSections, finalPrice }) {
    const [selectedSections, setSelectedSections] = useState([]);

    useEffect(() => {
        if (isOpen) setSelectedSections([]);
    }, [isOpen, plan]);

    if (!isOpen || !plan) return null;

    const isCorporate = plan.name === "Corporate";

    const toggleSection = (sectionId) => {
        setSelectedSections(prev =>
            prev.includes(sectionId)
                ? prev.filter(id => id !== sectionId)
                : [...prev, sectionId]
        );
    };

    const handleConfirm = () => {
        onConfirm(plan._id, isCorporate ? selectedSections : []);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-gray-800 rounded-lg w-full max-w-lg shadow-2xl border border-gray-700 flex flex-col max-h-[90vh]">

                <div className="flex justify-between items-center p-6 border-b border-gray-700">
                    <h3 className="text-2xl font-bold text-white">Confirm Subscription</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto">
                    <div className="mb-6">
                        <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">Plan Selected</p>
                        <h4 className="text-3xl font-bold text-white">{plan.name}</h4>
                        <p className="text-green-400 font-bold text-xl mt-1">${finalPrice} / month</p>
                    </div>

                    {isCorporate && (
                        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 mb-6">
                            <h5 className="text-white font-semibold mb-3 flex items-center gap-2">
                                <span className="bg-blue-600 w-2 h-2 rounded-full"></span>
                                Select Accessible Sections
                            </h5>
                            <p className="text-xs text-gray-400 mb-4">
                                Choose which sports sections will be included in your plan.
                            </p>

                            <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                                {allSections.map(section => (
                                    <label
                                        key={section._id}
                                        className={`flex items-center justify-between p-3 rounded cursor-pointer transition-all border ${selectedSections.includes(section._id)
                                            ? "bg-blue-900/20 border-blue-500/50"
                                            : "bg-gray-800 border-gray-700 hover:border-gray-600"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedSections.includes(section._id)
                                                ? "bg-blue-600 border-blue-600"
                                                : "border-gray-500 bg-transparent"
                                                }`}>
                                                {selectedSections.includes(section._id) && <Check className="w-3.5 h-3.5 text-white" />}
                                            </div>
                                            <div>
                                                <p className="text-white text-sm font-medium">{section.name}</p>
                                                <p className="text-xs text-gray-500">{section.sportType}</p>
                                            </div>
                                        </div>
                                        <input
                                            type="checkbox"
                                            className="hidden"
                                            checked={selectedSections.includes(section._id)}
                                            onChange={() => toggleSection(section._id)}
                                        />
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}

                    <p className="text-sm text-gray-400">
                        By confirming, you agree to the Terms of Service. The subscription will automatically renew every 30 days.
                    </p>
                </div>

                <div className="p-6 border-t border-gray-700 flex justify-end gap-3 bg-gray-800/50 rounded-b-lg">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-300 hover:text-white font-medium transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={isCorporate && selectedSections.length === 0}
                        className={`px-6 py-2 rounded-lg font-bold text-white transition-all ${(isCorporate && selectedSections.length === 0)
                            ? "bg-gray-600 cursor-not-allowed opacity-50"
                            : "bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-900/20"
                            }`}
                    >
                        Confirm & Pay
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function MembershipsTab({ currentPlan, membershipPlans, onBuyMembership, profile, allSections }) {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getFinalPrice = (plan) => {
        if (!plan) return 0;
        if (profile?.phone && profile.phone.trim() !== "") {
            return (plan.price * 0.95).toFixed(2);
        }
        return plan.price;
    };

    const handleChoosePlan = (plan) => {
        if (currentPlan?.plan?.toString() === plan._id.toString()) {
            alert("This is your current plan.");
            return;
        }
        setSelectedPlan(plan);
        setIsModalOpen(true);
    };

    const handleConfirmPurchase = async (planId, sectionIds) => {
        try {
            await onBuyMembership(planId, sectionIds);
            setIsModalOpen(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1 className="text-4xl font-bold text-white mb-12">My Subscriptions</h1>

            {currentPlan ? (
                <div className="bg-green-700 p-6 rounded-lg mb-8 max-w-2xl shadow-lg shadow-green-900/20">
                    <span className="text-green-100 font-medium text-lg block mb-1">Current Plan</span>
                    <div className="flex justify-between items-end">
                        <span className="text-white text-3xl font-bold">{currentPlan.planName}</span>
                        <span className="text-green-100 text-sm bg-green-800/50 px-3 py-1 rounded-full">
                            Active until {new Date(currentPlan.endDate).toLocaleDateString()}
                        </span>
                    </div>
                </div>
            ) : (
                <p className="text-gray-500 mb-8 text-lg">You have no active subscriptions.</p>
            )}

            <h2 className="text-3xl font-bold text-white mt-12 mb-8">Available Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {membershipPlans.map(plan => {
                    const isCurrent = currentPlan?.plan?.toString() === plan._id.toString();

                    return (
                        <div
                            key={plan._id}
                            className={`relative rounded-xl p-8 border transition-all duration-300 flex flex-col ${plan.highlighted
                                ? "bg-gradient-to-b from-blue-900/50 to-gray-900 border-blue-500 transform shadow-xl shadow-blue-900/10"
                                : "bg-gray-900 border-gray-800 hover:border-gray-600"
                                }`}
                        >
                            {plan.highlighted && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <span className="px-4 py-1 bg-blue-500 text-white text-xs font-bold uppercase tracking-wide rounded-full shadow-lg">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                            <div className="mb-6 h-16 flex flex-col justify-end">
                                {profile?.phone ? (
                                    <div className="flex flex-col items-start">
                                        <span className="text-sm font-medium text-gray-500 line-through decoration-gray-600 mb-0.5 ml-1">
                                            ${plan.price} /mo
                                        </span>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-4xl font-extrabold text-green-400 tracking-tight">
                                                ${getFinalPrice(plan)}
                                            </span>
                                            <span className="text-sm font-medium text-gray-400">/mo</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-extrabold text-white tracking-tight">
                                            ${plan.price}
                                        </span>
                                        <span className="text-sm font-medium text-gray-400">/mo</span>
                                    </div>
                                )}
                            </div>

                            <ul className="space-y-4 mb-8 flex-grow">
                                {plan.features.map((feature, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${plan.highlighted ? "text-blue-400" : "text-gray-500"}`} />
                                        <span className="text-gray-300 text-sm leading-tight">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => handleChoosePlan(plan)}
                                disabled={isCurrent}
                                className={`w-full py-4 rounded-lg font-bold transition-all ${isCurrent
                                    ? "bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700"
                                    : plan.highlighted
                                        ? "bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-900/20"
                                        : "bg-white text-gray-900 hover:bg-gray-100"
                                    }`}
                            >
                                {isCurrent ? "Current Plan" : "Choose Plan"}
                            </button>
                        </div>
                    );
                })}
            </div>

            <PurchaseModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                plan={selectedPlan}
                finalPrice={getFinalPrice(selectedPlan)}
                allSections={allSections}
                onConfirm={handleConfirmPurchase}
            />
        </div>
    );
}
