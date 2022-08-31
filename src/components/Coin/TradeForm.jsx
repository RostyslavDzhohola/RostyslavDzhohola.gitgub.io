export default function TradeForm(props) {

  return (
    <div>
      <div className="relative mt-1 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-gray-500 sm:text-sm">$</span>
        </div>
        <input
          type="number" 
          min="0" 
          name="price"
          onChange={props.handleChange}
          value={props.coinInput}
          id="price"
          className="block w-40 rounded-md border-gray-300 pl-7 pr-12 focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm"
          placeholder="0.00"
          aria-describedby="price-currency"
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <span className="text-gray-500 sm:text-sm" id="price-currency">
            USD
          </span>
        </div>
      </div>
    </div>
  )
}
