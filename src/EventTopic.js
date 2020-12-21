import React, { useEffect , useState } from 'react';
import { PieChart , Pie , Cell , ResponsiveContainer } from 'recharts';

const EventTopic = ({ events }) => {
  const [ data, setData ] = useState([]);

  useEffect(() => {
    setData(() => getData());
  }, [ events ] );

  const getData = () => {
    const topics = [ 'React', 'JavaScript', 'Node', 'jQuery', 'AngularJS' ];
    const data = topics.map(( topic ) => {
      const value = events.filter(({ summary }) =>
      summary.split( ' ' ).includes( topic )).length;
      return { name : topic , value };
    });
    return data;
  };

  const Colors = [ '#003F5C' , '#58508D' , '#BC5090' , '#ff6361' , '#FFA600' ];

  return (

    <ResponsiveContainer height = { 400 } className = "charts" >

      <PieChart width = { 400 } height = { 400 } >

        <Pie
          data = { data }
          cx = { 200 }
          cy = { 200 }
          labelLine = { false }
          outerRadius = { 80 }
          fill = "#8884d8"
          dataKey = "value"
          label = {({ name , percent }) => `${name} ${( percent * 100 ).toFixed(0)}%` }
        >

          {
            data.map((entry, index) => <Cell key={`cell-${index}`} fill={Colors[index % Colors.length]} name={entry.name}/>)
          }

        </Pie>

      </PieChart>

    </ResponsiveContainer>

  );
}

export default EventTopic;