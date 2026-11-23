import { useState } from 'react'
import campusPhoto from './assets/ateneo-campus-new.jpg'
import profilePhoto from './assets/ven-jasser-gallano.jpg'

const assignments = [
  {
    number: '01',
    title: 'Unit Conversion',
    description: 'Celsius, Fahrenheit, meters, and feet using reusable JavaScript functions.',
    topics: ['Functions', 'Input', 'Math'],
    color: '#f4c350',
  },
  {
    number: '02',
    title: 'Income Tax Calculator',
    description: 'A graduated income tax calculator built with conditions and form controls.',
    topics: ['Conditions', 'Forms', 'Logic'],
    color: '#ee8156',
  },
  {
    number: '03',
    title: 'Loops & Natural Numbers',
    description: 'Factorial, sum, and average calculations using three different loop structures.',
    topics: ['Loops', 'Numbers', 'Iteration'],
    color: '#4fa6a0',
  },
  {
    number: '04',
    title: 'Simple Payroll',
    description: 'An employee payroll summary that calculates gross pay, deductions, and net pay.',
    topics: ['Variables', 'Objects', 'Output'],
    color: '#8174d1',
  },
]

const hobbies = [
  {
    title: 'Coding',
    number: '01',
    description: 'Building projects, solving problems, and turning ideas into working experiences.',
    symbol: '</>',
    color: '#f4c350',
  },
  {
    title: 'Mechanical Cars',
    number: '02',
    description: 'Learning how machines work and appreciating the detail behind automotive design.',
    symbol: 'RPM',
    color: '#ee8156',
  },
  {
    title: 'Gaming',
    number: '03',
    description: 'Enjoying interactive worlds, strategy, teamwork, and a good challenge.',
    symbol: '⌁',
    color: '#4fa6a0',
  },
  {
    title: 'Reading',
    number: '04',
    description: 'Exploring stories, ideas, and new perspectives beyond the classroom.',
    symbol: 'Aa',
    color: '#8174d1',
  },
]

function ArrowIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

const peso = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
  minimumFractionDigits: 2,
})

function AssignmentShell({
  number,
  title,
  description,
  children,
}: {
  number: string
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div className="assignment-tool">
      <span className="tool-kicker">Interactive exercise · Assignment {number}</span>
      <h3>{title}</h3>
      <p className="tool-description">{description}</p>
      {children}
    </div>
  )
}

function ConversionTool() {
  const [value, setValue] = useState('')
  const [result, setResult] = useState('Enter a value and choose one of the four conversions.')

  const convert = (kind: 'cToF' | 'fToC' | 'mToFt' | 'ftToM') => {
    const input = Number(value)
    if (value.trim() === '' || !Number.isFinite(input)) {
      setResult('Please enter a valid numeric value first.')
      return
    }

    const calculations = {
      cToF: `${input}°C is ${((input * 9) / 5 + 32).toFixed(2)}°F`,
      fToC: `${input}°F is ${(((input - 32) * 5) / 9).toFixed(2)}°C`,
      mToFt: `${input} meter${input === 1 ? '' : 's'} is ${(input * 3.28084).toFixed(2)} feet`,
      ftToM: `${input} ${input === 1 ? 'foot' : 'feet'} is ${(input / 3.28084).toFixed(2)} meters`,
    }
    setResult(calculations[kind])
  }

  return (
    <AssignmentShell
      number="01"
      title="Unit Conversion"
      description="Convert temperature and length units using JavaScript functions."
    >
      <label className="tool-label" htmlFor="conversion-value">
        Enter numeric value
      </label>
      <input
        className="tool-input"
        id="conversion-value"
        inputMode="decimal"
        type="number"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="e.g. 100"
      />
      <div className="conversion-buttons">
        <button onClick={() => convert('cToF')}>
          <small>Temperature</small>Celsius → Fahrenheit
        </button>
        <button onClick={() => convert('fToC')}>
          <small>Temperature</small>Fahrenheit → Celsius
        </button>
        <button onClick={() => convert('mToFt')}>
          <small>Length</small>Meters → Feet
        </button>
        <button onClick={() => convert('ftToM')}>
          <small>Length</small>Feet → Meters
        </button>
      </div>
      <div className="tool-result" aria-live="polite">
        {result}
      </div>
    </AssignmentShell>
  )
}

function TaxTool() {
  const [income, setIncome] = useState('')
  const [result, setResult] = useState('Enter your net taxable income to compute your income tax.')

  const computeTax = () => {
    const amount = Number(income)
    if (income.trim() === '' || !Number.isFinite(amount) || amount < 0) {
      setResult('Please enter a valid non-negative taxable income.')
      return
    }

    let tax = 0
    if (amount > 8_000_000) tax = 2_410_000 + (amount - 8_000_000) * 0.35
    else if (amount > 2_000_000) tax = 490_000 + (amount - 2_000_000) * 0.32
    else if (amount > 800_000) tax = 130_000 + (amount - 800_000) * 0.3
    else if (amount > 400_000) tax = 30_000 + (amount - 400_000) * 0.25
    else if (amount > 250_000) tax = (amount - 250_000) * 0.2

    setResult(`Estimated income tax: ${peso.format(tax)}`)
  }

  return (
    <AssignmentShell
      number="02"
      title="Income Tax Calculator"
      description="Compute Philippine net taxable income tax using progressive tax brackets."
    >
      <div className="inline-form">
        <div>
          <label className="tool-label" htmlFor="tax-income">
            Net taxable income (₱)
          </label>
          <input
            className="tool-input"
            id="tax-income"
            type="number"
            min="0"
            value={income}
            onChange={(event) => setIncome(event.target.value)}
            placeholder="e.g. 320000"
          />
        </div>
        <button className="primary-tool-button" onClick={computeTax}>
          Compute income tax
        </button>
      </div>
      <div className="tool-result" aria-live="polite">
        {result}
      </div>
      <div className="tax-table-wrap">
        <table className="tax-table">
          <thead>
            <tr>
              <th>Over</th>
              <th>But not over</th>
              <th>Basic tax + rate</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>—</td><td>₱250,000</td><td>0%</td></tr>
            <tr><td>₱250,000</td><td>₱400,000</td><td>20% of excess over ₱250,000</td></tr>
            <tr><td>₱400,000</td><td>₱800,000</td><td>₱30,000 + 25% of excess</td></tr>
            <tr><td>₱800,000</td><td>₱2,000,000</td><td>₱130,000 + 30% of excess</td></tr>
            <tr><td>₱2,000,000</td><td>₱8,000,000</td><td>₱490,000 + 32% of excess</td></tr>
            <tr><td>₱8,000,000</td><td>—</td><td>₱2,410,000 + 35% of excess</td></tr>
          </tbody>
        </table>
      </div>
    </AssignmentShell>
  )
}

function LoopsTool() {
  const [number, setNumber] = useState('')
  const [result, setResult] = useState<null | { factorial: string; sum: number; average: number }>(null)
  const [message, setMessage] = useState('Enter a positive integer to compute all three outputs.')

  const compute = () => {
    const n = Number(number)
    if (!Number.isInteger(n) || n < 1 || n > 500) {
      setResult(null)
      setMessage('Enter a whole number from 1 to 500.')
      return
    }

    let factorial = 1n
    let i = 1n
    while (i <= BigInt(n)) {
      factorial *= i
      i++
    }

    let sum = 0
    let j = 1
    do {
      sum += j
      j++
    } while (j <= n)

    let total = 0
    for (let k = 1; k <= n; k++) total += k

    setResult({ factorial: factorial.toString(), sum, average: total / n })
    setMessage('')
  }

  return (
    <AssignmentShell
      number="03"
      title="Looping Operations"
      description="Compute factorial, sum, and average of the first N natural numbers."
    >
      <div className="inline-form">
        <div>
          <label className="tool-label" htmlFor="loop-number">
            Enter positive integer (N)
          </label>
          <input
            className="tool-input"
            id="loop-number"
            type="number"
            min="1"
            max="500"
            value={number}
            onChange={(event) => setNumber(event.target.value)}
            placeholder="e.g. 5"
          />
        </div>
        <button className="primary-tool-button" onClick={compute}>
          Compute results
        </button>
      </div>
      {result ? (
        <div className="loop-results" aria-live="polite">
          <div><span>While loop</span><strong>Factorial</strong><p>{result.factorial}</p></div>
          <div><span>Do-while loop</span><strong>Sum</strong><p>{result.sum}</p></div>
          <div><span>For loop</span><strong>Average</strong><p>{result.average.toFixed(2)}</p></div>
        </div>
      ) : (
        <div className="tool-result" aria-live="polite">{message}</div>
      )}
    </AssignmentShell>
  )
}

type Employee = {
  id: number
  name: string
  days: number
  rate: number
  deduction: number
}

function PayrollTool() {
  const [name, setName] = useState('')
  const [days, setDays] = useState('')
  const [rate, setRate] = useState('')
  const [deduction, setDeduction] = useState('')
  const [deleteLine, setDeleteLine] = useState('')
  const [employees, setEmployees] = useState<Employee[]>([])
  const [error, setError] = useState('')

  const addEmployee = () => {
    const daysValue = Number(days)
    const rateValue = Number(rate)
    const deductionValue = Number(deduction)
    if (
      !name.trim() ||
      !Number.isFinite(daysValue) ||
      daysValue <= 0 ||
      !Number.isFinite(rateValue) ||
      rateValue < 0 ||
      !Number.isFinite(deductionValue) ||
      deductionValue < 0
    ) {
      setError('Complete all employee fields using valid non-negative values.')
      return
    }
    setEmployees((current) => [
      ...current,
      { id: Date.now(), name: name.trim(), days: daysValue, rate: rateValue, deduction: deductionValue },
    ])
    setName('')
    setDays('')
    setRate('')
    setDeduction('')
    setError('')
  }

  const removeEmployee = () => {
    const line = Number(deleteLine)
    if (!Number.isInteger(line) || line < 1 || line > employees.length) {
      setError('Enter a valid line number to delete.')
      return
    }
    setEmployees((current) => current.filter((_, index) => index !== line - 1))
    setDeleteLine('')
    setError('')
  }

  return (
    <AssignmentShell
      number="04"
      title="Simple Payroll System"
      description="Add and delete employee records dynamically in the payroll table."
    >
      <div className="payroll-form">
        <label>Employee name<input value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Juan Dela Cruz" /></label>
        <label>Days worked<input type="number" min="1" value={days} onChange={(event) => setDays(event.target.value)} placeholder="e.g. 15" /></label>
        <label>Daily rate (₱)<input type="number" min="0" value={rate} onChange={(event) => setRate(event.target.value)} placeholder="e.g. 650" /></label>
        <label>Deduction (₱)<input type="number" min="0" value={deduction} onChange={(event) => setDeduction(event.target.value)} placeholder="e.g. 500" /></label>
      </div>
      <div className="payroll-actions">
        <button className="primary-tool-button" onClick={addEmployee}>+ Add employee</button>
        <div>
          <label className="tool-label" htmlFor="delete-line">Line number to delete</label>
          <input id="delete-line" className="tool-input" type="number" min="1" value={deleteLine} onChange={(event) => setDeleteLine(event.target.value)} placeholder="e.g. 1" />
          <button className="delete-button" onClick={removeEmployee}>Delete line</button>
        </div>
      </div>
      {error && <div className="form-error" role="alert">{error}</div>}
      <div className="payroll-table-wrap">
        <table className="payroll-table">
          <thead><tr><th>No.</th><th>Employee</th><th>Days</th><th>Daily rate</th><th>Gross pay</th><th>Deduction</th><th>Net pay</th></tr></thead>
          <tbody>
            {employees.length === 0 ? (
              <tr><td colSpan={7} className="empty-row">No employees added yet.</td></tr>
            ) : employees.map((employee, index) => {
              const gross = employee.days * employee.rate
              return (
                <tr key={employee.id}>
                  <td>{index + 1}</td><td>{employee.name}</td><td>{employee.days}</td>
                  <td>{peso.format(employee.rate)}</td><td>{peso.format(gross)}</td>
                  <td>{peso.format(employee.deduction)}</td><td><strong>{peso.format(gross - employee.deduction)}</strong></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </AssignmentShell>
  )
}

function App() {
  const [selectedAssignment, setSelectedAssignment] = useState(1)

  const openAssignment = (number: number) => {
    setSelectedAssignment(number)
    window.setTimeout(() => {
      document.getElementById('assignment-workspace')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 0)
  }

  return (
    <main>
      <header className="site-header">
        <a className="profile-brand" href="#about" aria-label="About Ven Jasser U. Gallano">
          <img src={profilePhoto} alt="Ven Jasser U. Gallano" />
          <span>
            <strong>Ven Jasser U. Gallano</strong>
            <small>ABOUT ME · COMPUTER SCIENCE STUDENT</small>
          </span>
        </a>
        <div className="institution">
          <span>ATENEO DE DAVAO UNIVERSITY</span>
          <span className="institution-dot" />
          <span>SCHOOL OF ARTS &amp; SCIENCES</span>
        </div>
        <a className="top-link" href="#assignments">
          View assignments <ArrowIcon />
        </a>
      </header>

      <section
        className="profile-hero"
        id="top"
        style={{ '--campus-image': `url(${campusPhoto})` } as React.CSSProperties}
      >
        <div className="hero-shade" />
        <div className="hero-grid" />
        <div className="hero-content">
          <div className="course-pill">
            <span />
            CS 1130 · Introduction to Computing
          </div>
          <p className="hero-overline">01 · My student portfolio</p>
          <h1>
            Curiosity in code.
            <br />
            <em>Purpose in every project.</em>
          </h1>
          <p className="hero-description">
            I am a Computer Science student exploring web development, problem-solving, and the
            communities that make campus life meaningful.
          </p>
          <div className="hero-actions">
            <a href="#assignments">
              <strong>04</strong>
              <span>Course assignments</span>
            </a>
            <a href="#about">
              <strong>03</strong>
              <span>Core web tools</span>
            </a>
            <a href="#involvement">
              <strong>02</strong>
              <span>Organizations</span>
            </a>
          </div>
        </div>
        <div className="campus-caption">
          <span>Campus</span>
          <strong>Ateneo de Davao University</strong>
          <small>Davao City, Philippines</small>
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="about-intro">
          <span className="about-label">02 · ABOUT ME</span>
          <h2>
            Hi, I’m Ven.
            <br />
            <em>I build and explore.</em>
          </h2>
          <p>
            I am a Computer Science student at Ateneo de Davao University. Technology gives me a
            way to create, while campus involvement and interests beyond class keep me curious,
            collaborative, and grounded.
          </p>
        </div>
        <div className="about-note">
          <span>PROFILE / 2025</span>
          <p>
            I enjoy understanding how things work—whether that means tracing a program, looking
            under a car hood, learning a new game system, or getting absorbed in a good book.
          </p>
          <div className="about-skills" aria-label="Core web tools">
            <span>HTML</span>
            <span>CSS</span>
            <span>JavaScript</span>
          </div>
        </div>
      </section>

      <section className="assignments-section" id="assignments">
        <div className="section-heading">
          <div>
            <span className="section-kicker">03 · CS 1130 coursework</span>
            <h2>Assignments &amp; tools</h2>
          </div>
          <p>
            Choose an assignment card, then use its working program directly below. Everything is
            kept together in one clear coursework section.
          </p>
        </div>
        <div className="assignment-grid">
          {assignments.map((assignment) => (
            <article
              className={`assignment-card ${
                selectedAssignment === Number(assignment.number) ? 'is-active' : ''
              }`}
              key={assignment.number}
              style={{ '--accent': assignment.color } as React.CSSProperties}
            >
              <div className="card-top">
                <span className="assignment-number">{assignment.number}</span>
                <span className="card-line" />
              </div>
              <span className="card-eyebrow">Assignment #{Number(assignment.number)}</span>
              <h3>{assignment.title}</h3>
              <p>{assignment.description}</p>
              <div className="tag-row">
                {assignment.topics.map((topic) => (
                  <span key={topic}>{topic}</span>
                ))}
              </div>
              <button className="open-assignment" onClick={() => openAssignment(Number(assignment.number))}>
                {selectedAssignment === Number(assignment.number) ? 'Currently open' : 'Open assignment'}
                <ArrowIcon />
              </button>
            </article>
          ))}
        </div>

        <div className="assignment-workspace" id="assignment-workspace">
          <nav className="workspace-tabs" aria-label="Choose an assignment">
            {assignments.map((assignment) => (
              <button
                className={selectedAssignment === Number(assignment.number) ? 'active' : ''}
                onClick={() => setSelectedAssignment(Number(assignment.number))}
                key={assignment.number}
              >
                <span>{assignment.number}</span>
                {assignment.title}
              </button>
            ))}
          </nav>
          {selectedAssignment === 1 && <ConversionTool />}
          {selectedAssignment === 2 && <TaxTool />}
          {selectedAssignment === 3 && <LoopsTool />}
          {selectedAssignment === 4 && <PayrollTool />}
        </div>
      </section>

      <section className="hobbies-section" id="hobbies">
        <div className="section-heading">
          <div>
            <span className="section-kicker">04 · Beyond academics</span>
            <h2>Things I enjoy</h2>
          </div>
          <p>
            Interests that let me create, understand complex systems, recharge, and keep learning
            in different ways.
          </p>
        </div>
        <div className="hobby-grid">
          {hobbies.map((hobby) => (
            <article
              className="hobby-card"
              key={hobby.title}
              style={{ '--accent': hobby.color } as React.CSSProperties}
            >
              <span className="hobby-number">{hobby.number}</span>
              <div className="hobby-symbol">{hobby.symbol}</div>
              <h3>{hobby.title}</h3>
              <p>{hobby.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="involvement-section" id="involvement">
        <div className="involvement-heading">
          <span className="section-kicker light">05 · Campus &amp; community</span>
          <h2>Events and involvement</h2>
          <p>Experiences that build confidence, connection, and responsibility outside class.</p>
        </div>
        <div className="experience-list">
          <article>
            <span className="experience-year">EVENT</span>
            <div className="experience-mark stellar">X</div>
            <div>
              <span className="experience-type">Technology &amp; innovation</span>
              <h3>StellarX Davao</h3>
              <p>
                Joined a Davao-based experience centered on ideas, technology, creativity, and
                connecting with a wider community.
              </p>
            </div>
          </article>
          <article>
            <span className="experience-year">MEMBER</span>
            <div className="experience-mark ddrrm">DR</div>
            <div>
              <span className="experience-type">Student leadership</span>
              <h3>DDRRM · Samahan OVP</h3>
              <p>
                Member of the Disaster Risk Reduction and Management team under the SAMAHAN Office
                of the Vice President.
              </p>
            </div>
          </article>
        </div>
      </section>

      <footer>
        <a className="profile-brand footer-brand" href="#top">
          <img src={profilePhoto} alt="" />
          <span>
            <strong>Ven Jasser U. Gallano</strong>
            <small>COMPUTER SCIENCE STUDENT</small>
          </span>
        </a>
        <p>
          Computer Studies Division
          <br />
          School of Arts and Sciences
        </p>
        <p className="footer-school">Ateneo de Davao University</p>
      </footer>
    </main>
  )
}

export default App
