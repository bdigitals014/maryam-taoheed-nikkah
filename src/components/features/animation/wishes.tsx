"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { motion } from "motion/react";

type Wish = {
  id?: string;
  name: string;
  message: string;
};

export default function Wishes() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  // Fetch wishes
  const fetchWishes = async () => {
    const snapshot = await getDocs(collection(db, "wishes"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Wish, "id">),
    }));
    setWishes(data.reverse());
  };

  useEffect(() => {
    fetchWishes();
  }, []);

  // Submit
  const handleSubmit = async () => {
    if (!name || !message) return;

    await addDoc(collection(db, "wishes"), {
      name,
      message,
      createdAt: new Date(),
    });

    setName("");
    setMessage("");
    setOpen(false);

    fetchWishes();
  };

  // Split into 2 rows
  const row1 = wishes.filter((_, i) => i % 2 === 0);
  const row2 = wishes.filter((_, i) => i % 2 !== 0);

  return (
    <section className="py-12 text-center text-white">
      <h2 className="text-3xl font-semibold mb-10">
        Well Wishes & Duas
      </h2>

      {/* MOBILE: Moving Rows */}
      <div className="block lg:hidden space-y-6 overflow-hidden">
        {/* Row 1 */}
        <motion.div
          className="flex gap-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear",
          }}
        >
          {[...row1, ...row1].map((wish, index) => (
            <Card key={index} wish={wish} />
          ))}
        </motion.div>

        {/* Row 2 (reverse direction) */}
        <motion.div
          className="flex gap-4"
          animate={{ x: ["-50%", "0%"] }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear",
          }}
        >
          {[...row2, ...row2].map((wish, index) => (
            <Card key={index} wish={wish} />
          ))}
        </motion.div>
      </div>

      {/* DESKTOP: Grid */}
      <div className="hidden lg:grid grid-cols-3 gap-6 mb-10">
        {wishes.map((wish) => (
          <Card key={wish.id} wish={wish} />
        ))}
      </div>

      {/* Button */}
      <button
        onClick={() => setOpen(true)}
        className="px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition cursor-pointer"
      >
        Say Wishes / Duas
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-md text-left">
            <h3 className="text-xl font-semibold mb-4 text-black">
              Send your wishes
            </h3>

            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-2 mb-3 rounded text-black"
            />

            <textarea
              placeholder="Your Wishes / Dua"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border p-2 mb-3 rounded text-black"
            />

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="bg-black text-white px-4 py-2 rounded cursor-pointer"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// 🔹 Card Component (clean reuse)
function Card({ wish }: { wish: Wish }) {
  return (
    <div className="relative min-w-[300px] h-[300px] lg:h-[350px] p-8 flex flex-col items-center justify-center text-center overflow-hidden group">
      
      {/* 1. The Glassy Background Layer */}
      <div className="absolute inset-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-xl z-0" />

      {/* 2. The Decorative Frame (Inspo-style) */}
      {/* Replace '/frame-floral.png' with your actual floral frame graphic */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          backgroundImage: "url('/images/wish-card.png')", 
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      {/* 3. Text Content (Centered & Stacked) */}
      <div className="relative z-20 px-4">
        <p className="font-bold text-white uppercase tracking-widest text-sm mb-3">
          {wish.name}
        </p>
        
        {/* Decorative divider line */}
        <div className="w-8 h-[1px] bg-white/40 mx-auto mb-4" />

        <p className="text-sm md:text-base text-white/90 leading-relaxed font-light italic">
          "{wish.message}"
        </p>
      </div>
    </div>
  );
}