import React, { useMemo, useState } from "react";

export default function SmoothieKioskMvp() {
  const smoothies = [
    {
      id: 1,
      name: "Tropical Mango",
      price: 18,
      image:
        "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=1200&q=80",
      description: "Mango, banana y naranja. Refrescante y dulce."
    },
    {
      id: 2,
      name: "Berry Power",
      price: 20,
      image:
        "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=1200&q=80",
      description: "Frutos rojos con banana. Sabor intenso y fresco."
    },
    {
      id: 3,
      name: "Green Fresh",
      price: 19,
      image:
        "https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=1200&q=80",
      description: "Kiwi, manzana y menta. Perfil liviano y natural."
    },
    {
      id: 4,
      name: "Banana Blast",
      price: 17,
      image:
        "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=1200&q=80",
      description: "Banana cremosa con toque vainilla."
    },
    {
      id: 5,
      name: "Choco Dream",
      price: 22,
      image:
        "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=1200&q=80",
      description: "Chocolate, banana y base cremosa."
    },
    {
      id: 6,
      name: "Strawberry Sky",
      price: 20,
      image:
        "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?auto=format&fit=crop&w=1200&q=80",
      description: "Frutilla protagonista, suave y clásica."
    }
  ];

  const sugarOptions = ["Con azúcar", "Con edulcorante", "Sin endulzar"];
  const baseOptions = ["Con yogurt", "Al agua", "Con helado"];

  const [selected, setSelected] = useState(smoothies[0]);
  const [sugar, setSugar] = useState(sugarOptions[0]);
  const [base, setBase] = useState(baseOptions[0]);
  const [cart, setCart] = useState([]);
  const [step, setStep] = useState("menu");
  const [paymentMethod, setPaymentMethod] = useState("Efectivo");
  const [orderNumber, setOrderNumber] = useState(null);

  const total = useMemo(
    () => cart.reduce((acc, item) => acc + item.price, 0),
    [cart]
  );

  const addToCart = () => {
    setCart((current) => [
      ...current,
      {
        uid: `${selected.id}-${Date.now()}`,
        name: selected.name,
        sugar,
        base,
        price: selected.price
      }
    ]);
    setStep("menu");
  };

  const paymentOptions = ["Efectivo", "Tarjeta", "Mercado Pago"];

  const removeItem = (uid) => {
    setCart((current) => current.filter((item) => item.uid !== uid));
  };

  const resetOrder = () => {
    setCart([]);
    setSelected(smoothies[0]);
    setSugar(sugarOptions[0]);
    setBase(baseOptions[0]);
    setPaymentMethod("Efectivo");
    setOrderNumber(null);
    setStep("menu");
  };

  const finishPayment = () => {
    if (paymentMethod === "Efectivo") {
      const generatedOrder = Math.floor(1000 + Math.random() * 9000);
      setOrderNumber(generatedOrder);
      setStep("cash-success");
      return;
    }

    setOrderNumber(null);
    setStep("paid-success");
  };

  const OptionButton = ({ active, children, onClick }) => (
    <button
      onClick={onClick}
      className={`w-full rounded-2xl px-4 py-4 text-left text-lg font-medium transition shadow-sm border ${
        active
          ? "bg-emerald-500 text-white border-emerald-500"
          : "bg-white text-slate-800 border-slate-200 hover:border-emerald-300"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-6 py-6">
        <header className="mb-6 rounded-[28px] bg-white/90 p-6 shadow-lg border border-white">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">
                Pedido autoservicio
              </p>
              <h1 className="mt-2 text-4xl font-black tracking-tight md:text-5xl">
                Fresh Point
              </h1>
              <p className="mt-2 text-lg text-slate-600">
                Elegí tu licuado, personalizalo y completá tu pedido en pantalla touch.
              </p>
            </div>
            <div className="rounded-3xl bg-slate-900 px-6 py-4 text-white shadow-xl">
              <p className="text-sm uppercase tracking-widest text-slate-300">Total</p>
              <p className="text-3xl font-black">${total}</p>
            </div>
          </div>
        </header>

        <div>
          <section className="rounded-[32px] bg-white/90 p-6 shadow-lg">
            {step === "menu" && (
              <>
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold">Elegí tu licuado</h2>
                    <p className="text-slate-600">Toque grande y navegación simple para kiosco.</p>
                  </div>
                  <button
                    onClick={() => setStep("confirm")}
                    className="rounded-2xl bg-sky-600 px-5 py-3 text-lg font-bold text-white shadow hover:bg-sky-700"
                  >
                    Ir al pago
                  </button>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {smoothies.map((smoothie) => (
                    <button
                      key={smoothie.id}
                      onClick={() => {
                        setSelected(smoothie);
                        setStep("customize");
                      }}
                      className="overflow-hidden rounded-[28px] bg-slate-50 text-left shadow-md transition hover:-translate-y-1 hover:shadow-xl"
                    >
                      <img
                        src={smoothie.image}
                        alt={smoothie.name}
                        className="h-52 w-full object-cover"
                      />
                      <div className="p-5">
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="text-2xl font-bold leading-tight">{smoothie.name}</h3>
                          <span className="rounded-full bg-emerald-100 px-3 py-1 text-base font-bold text-emerald-700">
                            ${smoothie.price}
                          </span>
                        </div>
                        <p className="mt-3 text-base text-slate-600">{smoothie.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === "customize" && (
              <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
                <div>
                  <button
                    onClick={() => setStep("menu")}
                    className="mb-4 rounded-2xl border border-slate-200 px-4 py-2 text-base font-semibold text-slate-700"
                  >
                    ← Volver al catálogo
                  </button>
                  <div className="overflow-hidden rounded-[28px] bg-slate-50 shadow-md">
                    <img src={selected.image} alt={selected.name} className="h-72 w-full object-cover" />
                    <div className="p-6">
                      <div className="flex items-center justify-between gap-4">
                        <h2 className="text-3xl font-black">{selected.name}</h2>
                        <span className="rounded-full bg-emerald-500 px-4 py-2 text-lg font-black text-white">
                          ${selected.price}
                        </span>
                      </div>
                      <p className="mt-3 text-lg text-slate-600">{selected.description}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[28px] bg-sky-50 p-6 shadow-inner">
                  <h3 className="text-2xl font-black">Personalización</h3>

                  <div className="mt-6">
                    <p className="mb-3 text-lg font-bold">Endulzante</p>
                    <div className="grid gap-3">
                      {sugarOptions.map((option) => (
                        <OptionButton
                          key={option}
                          active={sugar === option}
                          onClick={() => setSugar(option)}
                        >
                          {option}
                        </OptionButton>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="mb-3 text-lg font-bold">Base</p>
                    <div className="grid gap-3">
                      {baseOptions.map((option) => (
                        <OptionButton
                          key={option}
                          active={base === option}
                          onClick={() => setBase(option)}
                        >
                          {option}
                        </OptionButton>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 rounded-3xl bg-white p-5 shadow-sm">
                    <p className="text-sm uppercase tracking-widest text-slate-500">Resumen</p>
                    <p className="mt-2 text-xl font-black">{selected.name}</p>
                    <p className="mt-1 text-base text-slate-600">{sugar}</p>
                    <p className="text-base text-slate-600">{base}</p>
                    <button
                      onClick={addToCart}
                      className="mt-5 w-full rounded-2xl bg-emerald-500 px-5 py-4 text-xl font-black text-white shadow hover:bg-emerald-600"
                    >
                      Agregar al pedido
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === "confirm" && (
              <div>
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-3xl font-black">Confirmación del pedido</h2>
                    <p className="text-slate-600">Revisá tu pedido y elegí cómo querés pagar.</p>
                  </div>
                  <button
                    onClick={() => setStep("menu")}
                    className="rounded-2xl border border-slate-200 px-4 py-3 text-base font-semibold text-slate-700"
                  >
                    Agregar más productos
                  </button>
                </div>

                {cart.length === 0 ? (
                  <div className="rounded-[28px] border-2 border-dashed border-slate-200 p-12 text-center">
                    <p className="text-2xl font-bold">Todavía no agregaste licuados.</p>
                    <p className="mt-2 text-slate-600">Volvé al catálogo y armá tu primer pedido.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.uid}
                        className="flex flex-col gap-4 rounded-[24px] bg-slate-50 p-5 shadow-sm md:flex-row md:items-center md:justify-between"
                      >
                        <div>
                          <p className="text-2xl font-black">{item.name}</p>
                          <p className="text-base text-slate-600">{item.sugar}</p>
                          <p className="text-base text-slate-600">{item.base}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <p className="text-2xl font-black">${item.price}</p>
                          <button
                            onClick={() => removeItem(item.uid)}
                            className="rounded-2xl bg-rose-100 px-4 py-3 text-base font-bold text-rose-700"
                          >
                            Quitar
                          </button>
                        </div>
                      </div>
                    ))}

                    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                      <div className="rounded-[28px] bg-sky-50 p-6 shadow-sm">
                        <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Forma de pago</p>
                        <div className="mt-4 grid gap-3">
                          {paymentOptions.map((option) => (
                            <OptionButton
                              key={option}
                              active={paymentMethod === option}
                              onClick={() => setPaymentMethod(option)}
                            >
                              {option}
                            </OptionButton>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-[28px] bg-slate-900 p-6 text-white shadow-xl">
                        <p className="text-sm uppercase tracking-[0.25em] text-slate-300">Total final</p>
                        <p className="mt-1 text-4xl font-black">${total}</p>
                        <p className="mt-3 text-base text-slate-300">Pago seleccionado: {paymentMethod}</p>
                        <button
                          onClick={finishPayment}
                          className="mt-5 w-full rounded-2xl bg-emerald-500 px-6 py-4 text-xl font-black text-white hover:bg-emerald-600"
                        >
                          Pagar ahora
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {step === "cash-success" && (
              <div className="rounded-[32px] bg-white p-10 text-center shadow-lg">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">Pago en efectivo</p>
                <h2 className="mt-4 text-4xl font-black">Pedido confirmado</h2>
                <p className="mt-4 text-xl text-slate-600">Acercate a la caja y aboná tu pedido.</p>
                <div className="mx-auto mt-8 max-w-md rounded-[32px] bg-emerald-50 p-8">
                  <p className="text-lg font-semibold text-slate-600">Número de pedido</p>
                  <p className="mt-2 text-6xl font-black text-emerald-600">#{orderNumber}</p>
                </div>
                <button
                  onClick={resetOrder}
                  className="mt-8 rounded-2xl bg-slate-900 px-8 py-4 text-xl font-black text-white"
                >
                  Nuevo pedido
                </button>
              </div>
            )}

            {step === "paid-success" && (
              <div className="rounded-[32px] bg-white p-10 text-center shadow-lg">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-600">Pago aprobado</p>
                <h2 className="mt-4 text-4xl font-black">Gracias por tu compra</h2>
                <p className="mt-4 text-xl text-slate-600">Tu pago fue registrado correctamente. Enseguida preparamos tu pedido.</p>
                <button
                  onClick={resetOrder}
                  className="mt-8 rounded-2xl bg-slate-900 px-8 py-4 text-xl font-black text-white"
                >
                  Nuevo pedido
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
