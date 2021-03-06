import axios from 'axios'
const subscriptionPlans = [
  {
    _id: '1',
    plan_name: 'Basic',
    plan_amount: '$1'
  },
  {
    _id: '2',
    plan_name: 'Standard',
    plan_amount: '$2'
  },
  {
    _id: '3',
    plan_name: 'Premium',
    plan_amount: '$3'
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
  return (
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
                <td>{aPlan.plan_amount}</td>
                <td><button onClick={() => backendWillProcess(aPlan)}>Buy</button></td>
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
