import { useState } from 'react'
import PayPal from '../Paypal/PayPal'
import AutoComplete from 'places-autocomplete-react'
import './BookingForm.css'

interface Props {
    selectedTime: string,
    handleSubmit: (
        firstName: string,
        lastName: string,
        telephone: string,
        email: string,
        address: string,
        medium: string,
        handle: string,
        mop: string,
        policy: string,
        auth: string,
        dob: string,
        privacy: boolean
    ) => void
}

const BookingForm: React.FC<Props> = ({
    selectedTime,
    handleSubmit
}) => {
    const selectedDate = new Date(selectedTime).toString()

    //form fields
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [address, setAddress] = useState('');
    const [medium, setMedium] = useState('');
    const [handle, setHandle] = useState('');
    const [mop, setMop] = useState('');
    const [dob, setDob] = useState('');
    const [policy, setPolicy] = useState('');
    const [auth, setAuth] = useState('');
    const [privacy, setPrivacy] = useState(false);

    const formSub = (e: any) => {
        e.preventDefault()
        setMediumError(false)
        theSubmission()
    }

    const [mediumError, setMediumError] = useState(false);
    const theSubmission = () => {
        if (medium !== '') {
            handleSubmit(firstName, lastName, telephone, email, address, medium, handle, mop, policy, auth, dob, privacy)
        } else {
            setMediumError(true)
        }
    }

    const handleAddress = (addressObject: { [index: string]: string }) => {
        const concat = addressObject.addressName + ', ' +
            addressObject.street + ', ' +
            addressObject.city + ', ' +
            addressObject.country + ', ' +
            addressObject.postCode
        address !== concat && setAddress(concat)
    }

    console.log('address', address)

    return (
        <div className='bookingContainer'>
            <div className='atBanner'>
                <h2 style={{ marginTop: '40px' }}>Appointment Booking Form</h2>
                <p>You have selected {selectedDate.split(':00 GMT')[0]}</p>
            </div>
            <hr className='hr' />

            <form
                className='bookingForm'
                onSubmit={(e: any) => formSub(e)}
            >
                <label>
                    <div className='bookingLabel'>First Name:</div> <div className='requiredIcon'>*</div>
                    <br />
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" required />
                </label>
                <label>
                    <div className='bookingLabel'>Last Name:</div> <div className='requiredIcon'>*</div>
                    <br />
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" required />
                </label>
                <label>
                    <div className='bookingLabel'>Telephone:</div> <div className='requiredIcon'>*</div>
                    <br />
                    <input type="text" value={telephone} onChange={(e) => setTelephone(e.target.value)} placeholder="Mobile Number" required />
                </label>
                <label>
                    <div className='bookingLabel'>Email:</div> <div className='requiredIcon'>*</div>
                    <br />
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e.g. example@example.com" required />
                </label>
                <hr />
                <div style={{ width: "94%", margin: "10px auto", textAlign: "left", fontSize: "14px" }}>Address:</div>
                <div className="addresses">
                    <AutoComplete
                        placesKey="AIzaSyAkuPHNHz8Ki1KV6n6iI1-EFVIC3ZAm0QY"
                        inputId="address"
                        setAddress={(addressObject: {}) => handleAddress(addressObject)}
                        required
                    />
                </div>
                <hr />
                <label>
                    <div className='bookingLabel'>Medium:</div> <div className='requiredIcon'>*</div>
                    <br />
                    {
                        mediumError && <div style={{ color: 'red', margin: '10px' }}>
                            Please ensure you have specified your preferred contact method.
                        </div>
                    }
                    <select
                        name="medium"
                        value={medium}
                        onChange={(e) => setMedium(e.target.value)}
                        style={mediumError ? { border: '2px solid red' } : {}}
                    >
                        <option value=''>-Select-</option>
                        <option value="skype">Skype</option>
                        <option value="google">Google Hangouts</option>
                        <option value="zoom">Zoom</option>
                        <option value="whatsapp">Whatsapp</option>
                        <option value="telephone">Telephone</option>
                    </select>
                </label>
                {
                    medium === 'whatsapp' || medium === 'telephone' || medium === '' || medium === '0' ?
                        <></> :
                        <label>
                            <div className='bookingLabel'>Handle:</div> <div className='requiredIcon'>*</div>
                            <br />
                            <input type="text" value={handle} onChange={(e) => setHandle(e.target.value)} placeholder={medium.substr(0, 1).toUpperCase() + medium.slice(1).toLowerCase() + ' handle'} required />
                        </label>
                }
                <label>
                    <div className='bookingLabel'>Method of Payment:</div> <div className='requiredIcon'>*</div>
                    <br />
                    <select name="mop" value={mop} onChange={(e) => setMop(e.target.value)} required>
                        <option value='' defaultValue=''>-Select-</option>
                        <option value="Self-funding">Self-funding</option>
                        <option value="aetna">Aetna</option>
                        <option value="allianz">Allianz</option>
                        <option value="bupa">Bupa</option>
                        <option value="aviva">Aviva</option>
                        <option value="axa-ppp">AXA PPP</option>
                        <option value="axa-ppp-international">AXA PPP International</option>
                        <option value="cigna">Cigna</option>
                        <option value="cigna-international">Cigna International</option>
                        <option value="exeter-friendly">Exeter Friendly</option>
                        <option value="healix">Healix</option>
                        <option value="simply-health">Simply Health</option>
                        <option value="vitality">Vitality</option>
                        <option value="wpa">WPA</option>
                    </select>
                </label>
                {
                    mop !== undefined && mop !== '' && mop !== 'Self-funding' ?
                        <>
                            <hr className="divider" />
                            <label>
                                <div className='bookingLabel'>Policy Number:</div> <div className='requiredIcon'>*</div>
                                <br />
                                <input type="text" value={policy} onChange={(e) => setPolicy(e.target.value)} placeholder="Also known as membership number" required minLength={5} />
                            </label>
                            <label>
                                <div className='bookingLabel'>Authorisation:</div> <div className='requiredIcon'>*</div>
                                <br />
                                <input type="text" value={auth} onChange={(e) => setAuth(e.target.value)} placeholder="Issued by your insurance provider" required />
                            </label>
                            <hr className="divider" />
                        </> :
                        mop === 'Self-funding' &&
                        <>
                            <hr className="divider" />
                            <div style={{ fontSize: '14px' }}>
                                We will collect the consultation fee of £250 when you submit this form
                            </div>
                            <hr className="divider" />
                        </>
                }
                <label>
                    <div className='bookingLabel'>Date of Birth:</div> <div className='requiredIcon'>*</div>
                    <br />
                    <input type="date" style={{ WebkitAppearance: 'button' }} value={dob} onChange={(e) => setDob(e.target.value)} required />
                </label>
                <label>
                    <div className='bookingLabel'>Privacy:</div> <div className='requiredIcon'>*</div>
                    <br />
                    <div className="checkbox-alignment">
                        <input
                            name="privacy"
                            type="checkbox"
                            style={{ appearance: 'auto', WebkitAppearance: 'checkbox', width: '30px', border: '1px solid var(--the-black)', margin: '0 15px' }}
                            checked={privacy}
                            onChange={() => setPrivacy(!privacy)}
                            required
                        />
                        <p>By ticking this box you indicate that you have read and agree with our<a href="https://www.londonfootandanklesurgery.co.uk/about-us/privacy-policy/" target="_blank" rel="noreferrer">&nbsp;Privacy Policy&nbsp;</a></p>
                    </div>
                </label>
                {
                    (mop === 'Self-funding' && privacy) ?
                        <div className="paypal-container">
                            <PayPal
                                price={250}
                                description="Virtual Consultation with Mr. Kaser Nazir, Consultant Podiatric Surgeon."
                                paySubmit={() => theSubmission()}
                            />
                        </div> :
                        <input className='submitButton' type="submit" value="SUBMIT" />
                }
            </form>

        </div>
    )
}

export default BookingForm