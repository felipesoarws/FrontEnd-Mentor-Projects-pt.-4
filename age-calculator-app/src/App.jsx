import './App.css'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';


// assets
import arrow from './assets/icon-arrow.svg'


const formData = (data) => { 
  console.log(data);
};

const year = new Date().getFullYear();


const schema = z.object({
  day: z.string()
  .max(2, { message: 'Only 2 characters.'})
  .nonempty('This field is required.')
  .transform((val) => Number(val)),
  month: z.string()
  .length(2, { message: 'Only 2 characters.'})
  .nonempty('This field is required.')
  .transform((val) => Number(val)),
  year: z.string()
  .length(4, { message: 'Only 4 characters.'})
  .nonempty('This field is required.')
  .transform((val) => Number(val)),
  })
  .refine((fields) => fields.day > 0 || fields.day < 32, {
    path: ["day"],
    message: "Invalid day.",
  })
  .refine((fields) => fields.month > 0 || fields.month < 13, {
    path: ["month"],
    message: "Invalid month.",
  })
  .refine((fields) => fields.year < year, {
    path: ["year"],
    message: "Must be in the past.",
  });
 
 

function App() {
  const { register, handleSubmit, formState: { errors }, } = useForm({ resolver: zodResolver(schema), })

  console.log('errors', errors);

  return (
    <div className="App">
      <div className="calc_container">
        <form action="" onSubmit={handleSubmit(formData)}>
        <div className="calc_container_inputs">
          <div className="calc_container_inputs_input">
          {errors.day && <label htmlFor="day" 
            style={{color: '#ff5757'}}>Day</label>}

            {!errors.day && <label htmlFor="day">Day</label>}

            {errors.day && <input type="number" placeholder='DD' 
            {...register('day')}
            style={{border: '1px solid #ff5757'}}/>}

            {!errors.day && <input type="number" placeholder='DD' 
            {...register('day')}
            />}   

            {errors.day && <span>{errors.day.message}</span>}
            
          </div>

          <div className="calc_container_inputs_input">
            
            {errors.month && <label htmlFor="month" 
            style={{color: '#ff5757'}}>Month</label>}

            {!errors.month && <label htmlFor="month">Month</label>}

            {errors.month && <input type="number" placeholder='MM' 
            {...register('month')}
            style={{border: '1px solid #ff5757'}}/>}

            {!errors.month && <input type="number" placeholder='MM' 
            {...register('month')}
            />}   

            {errors.month && <span>{errors.month.message}</span>}

          </div>

          <div className="calc_container_inputs_input">
          {errors.year && <label htmlFor="year" 
            style={{color: '#ff5757'}}>year</label>}

            {!errors.year && <label htmlFor="year">year</label>}

            {errors.year && <input type="number" placeholder='YYYY' 
            {...register('year')}
            style={{border: '1px solid #ff5757'}}/>}

            {!errors.year && <input type="number" placeholder='YYYY' 
            {...register('year')}
            />}   

            {errors.year && <span>{errors.year.message}</span>}
          </div>
        </div>

        <div className="calc_container_divider">
          <div className="calc_container_divider_line">
            <span></span>
            <div className="calc_container_divider_line_arrow"
           >
              <button type="submit">
                <img src={arrow} alt="" />
              </button>
            </div>
          </div>
        </div>
        </form>

        <div className="calc_container_timer">
          <div className="calc_container_timer_stats">
            <h2><span>--</span> years</h2>
          </div>
          <div className="calc_container_timer_stats">
            <h2><span>--</span> months</h2>
          </div>
          <div className="calc_container_timer_stats">
            <h2><span>--</span> days</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
