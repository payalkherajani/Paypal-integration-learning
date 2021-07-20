import axios from 'axios'
import { useState } from 'react'
import Paypal from './components/Paypal'
const subscriptionPlans = [
  {
    _id: '1',
    plan_name: 'Basic',
    plan_amount: '1.00'
  },
  {
    _id: '2',
    plan_name: 'Standard',
    plan_amount: '2.00'
  },
  {
    _id: '3',
    plan_name: 'Premium',
    plan_amount: '3.00'
  }
]

const backendWillProcess = async (selectedPlanDetails) => {
  try {
    const response = await axios.post('http://localhost:5000/pay', { 'planDetails': selectedPlanDetails })
    console.log({ response })
  } catch (err) {
    console.log(err)
  }

}


function App() {

  const [show, setShow] = useState(false)
  const [details, setDetails] = useState({})

  const showPaypalButton = (planDetails) => {
    setShow(true)
    setDetails(planDetails)
  }


  return (
    show === true ? (<Paypal plan={details} />) : (
      <div className="App">
        <table>
          <thead>
            <tr>
              <th>Plan</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              subscriptionPlans.map((aPlan) => {
                return <tr key={aPlan._id}>
                  <td>{aPlan.plan_name}</td>
                  <td>$ {aPlan.plan_amount}</td>
                  <td><button onClick={() => showPaypalButton(aPlan)}>Buy?</button></td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>)
  );
}

export default App;
