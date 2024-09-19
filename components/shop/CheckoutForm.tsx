export default function CheckoutForm() {
  return (
    <div className="flex flex-col space-y-5 w-full">
      <h1 className="text-2xl">Personal Details</h1>
      <div className="sm:flex sm:flex-col lg:grid lg:grid-cols-2 space-y-2.5 lg:space-y-0 lg:gap-5">
        <div className="flex flex-col">
          <label>Full name</label>
          <input
            type="text"
            className="border p-1.5 bg-transparent"
            placeholder="Full name"
          />
        </div>
        <div className="flex flex-col">
          <label>Email</label>
          <input
            type="email"
            className="border p-1.5 bg-transparent"
            placeholder="Email"
          />
        </div>
        <div className="flex flex-col">
          <label>Phone Number</label>
          <input
            type="phone"
            className="border p-1.5 bg-transparent"
            placeholder="Phone Number"
          />
        </div>
      </div>
      <h1 className="text-2xl">Shipping Details</h1>
      <div className="sm:flex sm:flex-col lg:grid lg:grid-cols-2 space-y-2.5 lg:space-y-0 lg:gap-5">
        <div className="flex flex-col">
          <label>Street Address</label>
          <input
            type="text"
            className="border p-1.5 bg-transparent"
            placeholder="Street Address"
          />
        </div>
        <div className="flex flex-col">
          <label>Suburb</label>
          <input
            type="text"
            className="border p-1.5 bg-transparent"
            placeholder="Suburb"
          />
        </div>
        <div className="flex flex-col">
          <label>City</label>
          <input
            type="text"
            className="border p-1.5 bg-transparent"
            placeholder="City"
          />
        </div>
        <div className="flex flex-col">
          <label>Postal Code</label>
          <input
            type="text"
            className="border p-1.5 bg-transparent"
            placeholder="Postal Code"
          />
        </div>
      </div>
      <button className="w-full font-bold fixed bottom-0 left-0 bg-white text-black py-2.5">Proceed to Payment</button>
    </div>
  );
}
