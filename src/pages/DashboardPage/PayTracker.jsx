
import React, { useReducer, useState } from 'react';
import styled from 'styled-components';

const GlobalWrapper = styled.div`
  background-color: #f0f4f9;
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
  color: #333;
  padding-bottom: 50px;
  background-image: radial-gradient(#e0e7ef 1px, transparent 1px);
  background-size: 20px 20px;
`;

const BalanceSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
`;

const BalanceLabel = styled.span`
  color: #888;
  margin-right: 15px;
  font-weight: 500;
`;

const BalanceValue = styled.div`
  background: white;
  padding: 10px 25px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 16px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  margin-right: 15px;
`;

const ConfirmButton = styled.button`
  background: #f0f2f5;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  color: #999;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  letter-spacing: 0.5px;
  transition: 0.2s;
  &:hover {
    background: #e0e4e9;
    color: #666;
  }
`;

const ChartLink = styled.a`
  position: absolute;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #888;
  font-size: 13px;
  cursor: pointer;
  text-decoration: none;
  border-bottom: 1px dashed #ccc;
  &:hover {
    color: #555;
    border-bottom: 1px solid #555;
  }
`;

const MainContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const TabContainer = styled.div`
  display: flex;
  padding-left: 20px;
`;

const Tab = styled.button`
  padding: 15px 40px;
  border: none;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  font-weight: bold;
  font-size: 12px;
  cursor: pointer;
  text-transform: uppercase;
  background-color: ${props => props.active ? 'white' : 'transparent'};
  color: ${props => props.active ? '#ff7f27' : '#333'};
  transition: all 0.2s;
  &:hover {
    color: #ff7f27;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 20px;
  border-top-left-radius: 0; 
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.03);
  min-height: 500px;
`;

const InputRow = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
`;

const DateInputGroup = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  color: #444;
  gap: 10px;
  span {
    font-size: 12px;
    color: #999;
    text-transform: uppercase;
  }
  input[type="date"] {
    border: 1px solid #e0e0e0;
    padding: 10px;
    border-radius: 8px;
    font-family: inherit;
    font-weight: bold;
    font-size: 13px;
    color: #444;
    outline: none;
    cursor: pointer;
    background: #f9f9f9;
  }
`;

const StyledInput = styled.input`
  border: 1px solid #e0e0e0;
  padding: 12px 15px;
  border-radius: 8px;
  flex: 1;
  font-size: 14px;
  outline: none;
  &::placeholder {
    color: #ccc;
  }
  &:focus {
    border-color: #ff7f27;
  }
`;

const StyledSelect = styled.select`
  border: 1px solid #e0e0e0;
  padding: 12px 15px;
  border-radius: 8px;
  flex: 1;
  font-size: 14px;
  color: #666;
  background: white;
  outline: none;
  &:focus {
    border-color: #ff7f27;
  }
`;

const AmountInputGroup = styled.div`
  position: relative;
  width: 140px;
  input {
    width: 100%;
    border: 1px solid #e0e0e0;
    padding: 12px 45px 12px 15px;
    border-radius: 8px;
    font-size: 14px;
    text-align: right;
    box-sizing: border-box;
    outline: none;
    font-weight: bold;
  }
  input:focus {
    border-color: #ff7f27;
  }
  .currency-label {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #aaa;
    font-size: 12px;
    font-weight: bold;
    pointer-events: none;
  }
`;

const ActionButton = styled.button`
  padding: 12px 30px;
  border-radius: 25px;
  font-weight: bold;
  font-size: 12px;
  cursor: pointer;
  text-transform: uppercase;
  border: ${props => props.primary ? 'none' : '1px solid #e0e0e0'};
  background: ${props => props.primary ? '#ff7f27' : 'white'};
  color: ${props => props.primary ? 'white' : '#444'};
  box-shadow: ${props => props.primary ? '0 4px 10px rgba(255, 127, 39, 0.3)' : 'none'};
  transition: all 0.2s;
  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
  &:active {
    transform: translateY(0);
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  max-height: 400px;
  overflow-y: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  th {
    text-align: left;
    padding: 15px;
    background-color: #f4f6f9;
    font-size: 11px;
    font-weight: bold;
    text-transform: uppercase;
    color: #333;
    position: sticky;
    top: 0;
    z-index: 10;
    &:first-child { border-top-left-radius: 10px; border-bottom-left-radius: 10px; }
    &:last-child { border-top-right-radius: 10px; border-bottom-right-radius: 10px; }
  }
  td {
    padding: 15px;
    border-bottom: 1px solid #f0f0f0;
    font-size: 13px;
    color: #555;
  }
`;

const AmountCell = styled.td`
  font-weight: bold;
  color: ${props => props.isIncome ? '#27ae60' : '#e74c3c'} !important; 
`;

const DeleteBtn = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #ccc;
  border: 1px solid #eee;
  border-radius: 50%;
  transition: all 0.2s;
  font-size: 18px;
  line-height: 1;
  padding-bottom: 2px;
  user-select: none;
  &:hover {
    background-color: #ffeaea;
    color: #e74c3c;
    border-color: #ffcccc;
  }
`;

const SummaryCard = styled.div`
  background-color: #f4f6f9;
  border-radius: 15px;
  padding: 20px;
  height: fit-content;
`;

const SummaryTitle = styled.h3`
  font-size: 12px;
  text-transform: uppercase;
  margin: 0 0 20px 0;
  text-align: center;
  font-weight: bold;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #e0e0e0;
  font-size: 13px;
  color: #555;
  &:last-child {
    border-bottom: none;
  }
  span:last-child {
    font-family: monospace;
    font-weight: 500;
  }
`;


const initialTransactions = [
  { id: 0, date: '2019-09-05', desc: 'Метро', category: 'Транспорт', amount: -30.00 },
  { id: 1, date: '2019-09-05', desc: 'Банани', category: 'Продукти', amount: -50.00 },
];


const addTransaction = (formData, id) => ({
  type: "transactions/addTransaction",
  payload: { 
    id, 
    date: formData.date, 
    desc: formData.desc, 
    category: formData.category, 
    amount: formData.amount 
  },
});

const removeTransaction = (id) => ({
  type: "transactions/deleteTransaction",
  payload: id,
});


function formReducer(state = initialTransactions, action) {
  switch (action.type) {
    case "transactions/addTransaction":
      return [action.payload, ...state]; 
    case "transactions/deleteTransaction":
      return state.filter((transaction) => transaction.id !== action.payload);
    default:
      return state;
  }
}


const formatCurrency = (amount) => {
  return new Intl.NumberFormat('uk-UA', { 
    style: 'decimal', 
    minimumFractionDigits: 2,
    maximumFractionDigits: 2 
  }).format(amount).replace(/,/g, '.');
};

const formatDateDisplay = (isoDate) => {
  if (!isoDate) return "";
  const [year, month, day] = isoDate.split('-');
  return `${day}.${month}.${year}`;
};



const InvestiqDashboard = () => {
  const [activeTab, setActiveTab] = useState('expenses');
  
  
  const [state, dispatch] = useReducer(formReducer, initialTransactions);

 
  const [formData, setFormData] = useState({
    date: new Date().toISOString().slice(0, 10),
    desc: '',
    category: '',
    amount: ''
  });

  
  const staticSummaryData = [
    { month: 'ЛИСТОПАД', amount: '10 000.00' },
    { month: 'ЖОВТЕНЬ', amount: '30 000.00' },
    { month: 'ВЕРЕСЕНЬ', amount: '30 000.00' },
    { month: 'СЕРПЕНЬ', amount: '20 000.00' },
    { month: 'ЛИПЕНЬ', amount: '15 000.00' },
    { month: 'ЧЕРВЕНЬ', amount: '18 000.00' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAdd = (e) => {
    e.preventDefault(); 
    
    if (!formData.desc || !formData.category || !formData.amount) {
      return; 
    }

    const rawAmount = parseFloat(formData.amount);
    const finalAmount = activeTab === 'expenses' ? -Math.abs(rawAmount) : Math.abs(rawAmount);
    
    
    const dataToSend = {
      ...formData,
      amount: finalAmount
    };

    
    dispatch(addTransaction(dataToSend, Date.now()));
    
    
    setFormData(prev => ({ ...prev, desc: '', category: '', amount: '' }));
  };

  const handleClear = () => {
    setFormData({
      date: new Date().toISOString().slice(0, 10),
      desc: '',
      category: '',
      amount: ''
    });
  };

  return (
    <GlobalWrapper>
      <BalanceSection>
        <BalanceLabel>Баланс:</BalanceLabel>
        <BalanceValue>55 000.00 UAH</BalanceValue>
        <ConfirmButton>ПІДТВЕРДИТИ</ConfirmButton>
        <ChartLink href="#">Перейти до звітів</ChartLink>
      </BalanceSection>

      <MainContainer>
        <TabContainer>
          <Tab active={activeTab === 'expenses'} onClick={() => setActiveTab('expenses')}>ВИТРАТИ</Tab>
          <Tab active={activeTab === 'income'} onClick={() => setActiveTab('income')}>ДОХІД</Tab>
        </TabContainer>

        <Card>
         
          <InputRow>
            <DateInputGroup>
              <span>Дата:</span>
              <input type="date" name="date" value={formData.date} onChange={handleInputChange} />
            </DateInputGroup>
            
            <StyledInput type="text" name="desc" placeholder="Опис товару" value={formData.desc} onChange={handleInputChange} />
            
            <StyledSelect name="category" value={formData.category} onChange={handleInputChange}>
              <option value="" disabled>Категорія товару</option>
              <option value="Продукти">Продукти</option>
              <option value="Транспорт">Транспорт</option>
              <option value="Розваги">Розваги</option>
              <option value="Здоров'я">Здоров'я</option>
              <option value="Комуналка">Комуналка</option>
              {activeTab === 'income' && <option value="Зарплата">Зарплата</option>}
              {activeTab === 'income' && <option value="Дод. дохід">Дод. дохід</option>}
            </StyledSelect>
            
            <AmountInputGroup>
              <input type="number" name="amount" placeholder="0.00" value={formData.amount} onChange={handleInputChange} min="0" step="0.01" />
              <span className="currency-label">UAH</span>
            </AmountInputGroup>
            
            <ActionButton primary onClick={handleAdd}>ВВЕСТИ</ActionButton>
            <ActionButton onClick={handleClear}>ОЧИСТИТИ</ActionButton>
          </InputRow>

          <ContentGrid>
            <TableWrapper>
              <Table>
                <thead>
                  <tr>
                    <th>ДАТА</th>
                    <th>ОПИС</th>
                    <th>КАТЕГОРІЯ</th>
                    <th>СУМА</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  
                  {state.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>{formatDateDisplay(transaction.date)}</td>
                      <td>{transaction.desc}</td>
                      <td>{transaction.category}</td>
                      <AmountCell isIncome={transaction.amount > 0}>
                        {transaction.amount > 0 ? '+ ' : '- '} 
                        {formatCurrency(Math.abs(transaction.amount))} грн.
                      </AmountCell>
                      <td>
                        <DeleteBtn onClick={() => dispatch(removeTransaction(transaction.id))} title="Видалити">
                          ×
                        </DeleteBtn>
                      </td>
                    </tr>
                  ))}
                  
                  {state.length < 5 && Array.from({ length: 5 - state.length }).map((_, i) => (
                    <tr key={`empty-${i}`}>
                      <td style={{color: 'transparent'}}>.</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </TableWrapper>

            <SummaryCard>
              <SummaryTitle>ЗВЕДЕННЯ</SummaryTitle>
              {staticSummaryData.map((item, index) => (
                <SummaryRow key={index}>
                  <span>{item.month}</span>
                  <span>{item.amount}</span>
                </SummaryRow>
              ))}
            </SummaryCard>
          </ContentGrid>
        </Card>
      </MainContainer>
    </GlobalWrapper>
  );
};

export default InvestiqDashboard;