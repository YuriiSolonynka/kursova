import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../lib/axiosInstance";
import { useToast } from "../components/ui/ToastContext";

function BookSection() {
    const { addToast } = useToast();
    const { sectionId } = useParams();
    const navigate = useNavigate();

    const [section, setSection] = useState(null);
    const [date, setDate] = useState("");
    const [timeOptions, setTimeOptions] = useState([]);
    const [time, setTime] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadSection = async () => {
            try {
                const res = await axiosInstance.get(`/sections/${sectionId}`);
                let sectionData = res.data;

                console.log("SECTION RAW:", sectionData);

                let scheduleParsed = sectionData.schedule;

                if (typeof scheduleParsed === "string") {
                    console.log("schedule IS STRING → PARSING...");
                    try {
                        scheduleParsed = JSON.parse(scheduleParsed);
                        console.log("PARSED schedule:", scheduleParsed);
                        if (typeof scheduleParsed === "string") {
                            console.log("schedule PARSED AGAIN...");
                            scheduleParsed = JSON.parse(scheduleParsed);
                        }
                    } catch (err) {
                        console.error("Failed to parse schedule:", err);
                        scheduleParsed = [];
                    }
                }

                if (!Array.isArray(scheduleParsed)) {
                    console.log("schedule is NOT array → forcing empty array");
                    scheduleParsed = [];
                }

                sectionData.schedule = scheduleParsed;
                console.log("FINAL schedule:", sectionData.schedule);

                setSection(sectionData);
            } catch (err) {
                console.error("ERROR loading section:", err);
                addToast("Failed to load section.", "error");
            }
        };

        loadSection();
    }, [sectionId]);

    const getDayShort = (dateStr) => {
        const d = new Date(dateStr);
        const map = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return map[d.getDay()];
    };

    const generateTimeSlots = (range) => {
        const [start, end] = range.split(" - ");
        const convert = (t) => {
            const [time, mod] = t.split(" ");
            let [h, m] = time.split(":").map(Number);
            if (mod === "PM" && h !== 12) h += 12;
            if (mod === "AM" && h === 12) h = 0;
            return h * 60 + m;
        };

        const startMin = convert(start);
        const endMin = convert(end);

        let result = [];
        for (let t = startMin; t <= endMin; t += 60) {
            const h = Math.floor(t / 60);
            const m = t % 60;
            result.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
        }
        return result;
    };

    useEffect(() => {
        console.log("DATE CHANGED:", date);
        if (!date || !section) return;

        if (!Array.isArray(section.schedule)) {
            setTimeOptions([]);
            return;
        }

        const dayShort = getDayShort(date);
        console.log("DAY SHORT:", dayShort);

        let options = [];
        section.schedule.forEach(item => {
            if (item.days.includes(dayShort)) {
                options.push(...generateTimeSlots(item.time));
            }
        });

        console.log("⏱ FINAL OPTIONS:", options);
        setTimeOptions(options);
        setTime("");
    }, [date, section]);

    const handleBooking = async () => {
        if (!date || !time) {
            addToast("Please select date and time.", "error");
            return;
        }

        setLoading(true);

        try {
            const res = await axiosInstance.post("/bookings", {
                sectionId,
                date,
                time
            });

            addToast("Booking confirmed!", "success");
            if (res.data.earnedPoints) {
                addToast(`You earned ${res.data.earnedPoints} bonus points!`, "success");
            }

            setTimeout(() => navigate("/cabinet?tab=bookings"), 1200);

        } catch (err) {
            console.error(err);
            addToast("Failed to create booking.", "error");
        } finally {
            setLoading(false);
        }
    };

    if (!section) return <div className="text-white p-10">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-950 py-20">
            <div className="container mx-auto px-6 max-w-2xl">
                <h1 className="text-4xl font-bold text-white mb-10">
                    Book: {section.name}
                </h1>

                <div className="mb-6">
                    <label className="block text-gray-400 mb-2">Select Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        min={(() => {
                            const tomorrow = new Date();
                            tomorrow.setDate(tomorrow.getDate() + 1);
                            return tomorrow.toISOString().split("T")[0];
                        })()}
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-400 mb-2">Select Time</label>
                    {timeOptions.length > 0 ? (
                        <select
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white"
                        >
                            <option value="">Choose time</option>
                            {timeOptions.map((t, idx) => (
                                <option key={`${t}-${idx}`} value={t}>{t}</option>
                            ))}
                        </select>
                    ) : (
                        <>
                            {date ? (
                                <p className="text-red-400">No times available this day.</p>
                            ) : (
                                <p className="text-gray-500">Pick date first.</p>
                            )}
                        </>
                    )}
                </div>

                <button
                    onClick={handleBooking}
                    disabled={loading}
                    className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-700"
                >
                    {loading ? "Processing..." : "Confirm Booking"}
                </button>
            </div>
        </div>
    );
}

export default BookSection;
