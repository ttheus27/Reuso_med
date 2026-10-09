/*------ inputs(prism-code for showcode purpose) start ------*/
export const input1 = `<div className="row gy-4">
<Col xl={4} lg={6}  md ={6} sm={12}>
    <p className="mb-2 text-muted">Basic Input:</p>
    <Form.Control type="text" id="input"/>
</Col>
<Col xl={4} lg={6}  md ={6} sm={12}>
    <Form.Label htmlFor="input-label">Form Input With Label</Form.Label>
    <Form.Control type="text" id="input-label"/>
</Col>
<Col xl={4} lg={6}  md ={6} sm={12}>
    <Form.Label htmlFor="input-placeholder">Form Input With Placeholder</Form.Label>
    <Form.Control type="text" id="input-placeholder" placeholder="Placeholder"/>
</Col>
<Col xl={4} lg={6}  md ={6} sm={12}>
    <Form.Label htmlFor="input-text">Type Text</Form.Label>
    <Form.Control type="text" id="input-text" placeholder="Text"/>
</Col>
<Col xl={4} lg={6}  md ={6} sm={12}>
    <Form.Label htmlFor="input-number">Type Number</Form.Label>
    <Form.Control type="number" id="input-number" placeholder="Number"/>
</Col>
<Col xl={4} lg={6}  md ={6} sm={12}>
    <Form.Label htmlFor="input-password">Type Password</Form.Label>
    <Form.Control type="password" id="input-password" placeholder="Password"/>
</Col>
<Col xl={4} lg={6}  md ={6} sm={12}>
    <Form.Label htmlFor="input-email">Type Email</Form.Label>
    <Form.Control type="email" id="input-email" placeholder="Email@xyz.com"/>
</Col>
<Col xl={4} lg={6}  md ={6} sm={12}>
    <Form.Label htmlFor="input-tel">Type Tel</Form.Label>
    <Form.Control type="tel" id="input-tel" placeholder="+1100-2031-1233"/>
</Col>
<Col xl={4} lg={6}  md ={6} sm={12}>
    <Form.Label htmlFor="input-date">Type Date</Form.Label>
    <Form.Control type="date" id="input-date"/>
</Col>
<Col xl={4} lg={6}  md ={6} sm={12}>
    <Form.Label htmlFor="input-week">Type Week</Form.Label>
    <Form.Control type="week" className="form-control" id="input-week"/>
</Col>
<Col xl={4} lg={6}  md ={6} sm={12}>
    <Form.Label htmlFor="input-month">Type Month</Form.Label>
    <Form.Control type="month" id="input-month"/>
</Col>
<Col xl={4} lg={6}  md ={6} sm={12}>
    <Form.Label htmlFor="input-time">Type Time</Form.Label>
    <Form.Control type="time" id="input-time"/>
</Col>
<Col xl={4} lg={6}  md ={6} sm={12}>
    <Form.Label htmlFor="input-datetime-local">Type datetime-local</Form.Label>
    <Form.Control type="datetime-local" id="input-datetime-local"/>
</Col>
<Col xl={4} lg={6}  md ={6} sm={12}>
    <Form.Label htmlFor="input-search">Type Search</Form.Label>
    <Form.Control type="search" id="input-search" placeholder="Search"/>
</Col>
<Col xl={4} lg={6}  md ={6} sm={12}>
    <Form.Label htmlFor="input-submit">Type Submit</Form.Label>
    <Form.Control type="submit" id="input-submit" defaultValue="Submit"/>
</Col>
<Col xl={4} lg={6}  md ={6} sm={12}>
    <Form.Label htmlFor="input-reset">Type Reset</Form.Label>
    <Form.Control type="reset" id="input-reset"/>
</Col>
<Col xl={4} lg={6}  md ={6} sm={12}>
    <Form.Label htmlFor="input-button">Type Button</Form.Label>
    <Form.Control type="button" className="form-control btn btn-primary" id="input-button"  defaultValue="Button"/>
</Col>
<Col xl={4} lg={6}  md ={6} sm={12}>
    <Row>
         <Col xl={3}>
            <Form.Label>Type Color</Form.Label>
            <Form.Control className="form-control form-input-color" type="color" defaultValue="#136bd0"/>
        </Col>
        <Col xl={5}>
            <div className="form-check">
                <p className="mb-3 px-0 text-muted">Type Checkbox</p>
                <Form.Check className="ms-2" type="checkbox"
                 defaultValue="" defaultChecked/>
            </div>
           
        </Col>
        <Col xl={4}>
            <div className="form-check">
                <p className="mb-3 px-0 text-muted">Type Radio</p>
                <Form.Check 
                className="ms-2" type="radio" defaultChecked/>
            </div>
        </Col>
    </Row>
</Col>
<Col xl={4} lg={6}  md ={6} sm={12}>
    <Form.Label htmlFor="input-file">Type File</Form.Label>
    <Form.Control type="file" id="input-file"/>
</Col>
<Col xl={4} lg={6}  md ={6} sm={12}>
    <Form.Label>Type Url</Form.Label>
    <Form.Control type="url"  name="website" placeholder="http://example.com"/>
</Col>
<Col xl={4} lg={6}  md ={6} sm={12}>
    <Form.Label htmlFor="input-disabled">Type Disabled</Form.Label>
    <Form.Control type="text" id="input-disabled" placeholder="Disabled input" disabled />
</Col>
<Col xl={4} lg={6}  md ={6} sm={12}>
    <Form.Label htmlFor="input-readonlytext">Input Readonly Text</Form.Label>
    <Form.Control type="text" readOnly className="form-control-plaintext" id="input-readonlytext" defaultValue="email@example.com"/>
</Col>
<Col xl={4} lg={6}  md ={6} sm={12}>
    <Form.Label htmlFor="disabled-readonlytext">Disabled Readonly Input</Form.Label>
    <Form.Control type="text" defaultValue="Disabled readonly input" id="disabled-readonlytext" aria-label="Disabled input example" disabled readOnly/>
</Col>
<Col xl={4} lg={6}  md ={6} sm={12}>
    <Form.Label>Type Readonly Input</Form.Label>
    <Form.Control type="text" defaultValue="Readonly input here..." aria-label="readonly input example" readOnly/>
</Col>
<Col xl={4} lg={6}  md ={6} sm={12}>
    <Form.Label htmlFor="text-area">Textarea</Form.Label>
    <Form.Control as="textarea" id="text-area" rows={1}/>
</Col>
<Col xl={4} lg={6}  md ={6} sm={12}>
    <Form.Label htmlFor="input-DataList">Datalist example</Form.Label>
    <Form.Control list="datalistOptions" id="input-DataList" placeholder="Type to search..."/>
    <datalist id="datalistOptions">
        <option defaultValue="San Francisco">
        </option>
        <option defaultValue="New York">
        </option>
        <option defaultValue="Seattle">
        </option>
        <option defaultValue="Los Angeles">
        </option>
        <option defaultValue="Chicago">
        </option>
    </datalist>
</Col>
</div>`;

export const input2 = `<div className="row gy-3">
<Col xl={12}>
    <Form.Label htmlFor="input-noradius">Input With No Radius</Form.Label>
    <Form.Control type="text" className="form-control rounded-0" id="input-noradius" placeholder="No Radius"/>
</Col>
<Col xl={12}>
    <Form.Label htmlFor="input-rounded">Input With Radius</Form.Label>
    <Form.Control type="text" id="input-rounded" placeholder="Default Radius"/>
</Col>
<Col xl={12}>
    <Form.Label htmlFor="input-rounded-pill">Rounded Input</Form.Label>
    <Form.Control type="text" className="form-control rounded-pill" id="input-rounded-pill" placeholder="Rounded"/>
</Col>
</div>`;

export const input3 = `<div className="row gy-3">
<Col xl={12}>
    <Form.Label htmlFor="input-rounded1">Default</Form.Label>
    <Form.Control type="text" id="input-rounded1" placeholder="Default"/>
</Col>
<Col xl={12}>
    <Form.Label htmlFor="input-rounded2">Dotted Input</Form.Label>
    <Form.Control type="text" className="form-control border-dotted" id="input-rounded2" placeholder="Dotted"/>
</Col>
<Col xl={12}>
    <Form.Label htmlFor="input-rounded3">Dashed Input</Form.Label>
    <Form.Control type="text" className="form-control border-dashed" id="input-rounded3" placeholder="Dashed"/>
</Col>
</div>`;

export const input4 = `<Form.Control className="form-control-sm mb-3" type="text"
placeholder=".form-control-sm" aria-label=".form-control-sm example"/>
<Form.Control className="mb-3" type="text" placeholder="Default input/"
    aria-label="default input example"/>
<Form.Control className="form-control-lg" type="text"
placeholder=".form-control-lg" aria-label=".form-control-lg example"/>`;

export const input5 = ` <Form>
<div className="mb-3">
    <Form.Label htmlFor="exampleInputEmail1">Email
        address</Form.Label>
    <Form.Control type="email" id="exampleInputEmail1/"
        aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll
        never share your email
        with
        anyone else.</div>
</div>
<div className="mb-3">
    <Form.Label htmlFor="exampleInputPassword1">Password</Form.Label>
    <Form.Control type="password" id="exampleInputPassword1"/>
</div>
<div className="mb-3 form-check">
    <Form.Check type="checkbox" label="Check me out" className="" id="exampleCheck1"/>
</div>
<Button variant='primary' type="submit" className="">Submit</Button>
</Form>`;

export const input6 = ` <Form.Label htmlFor="inputPassword5">Password</Form.Label>
<Form.Control type="password" id="inputPassword5" className="form-control/"
    aria-describedby="passwordHelpBlock"/>
<div id="passwordHelpBlock" className="form-text">
    Your password must be 8-20 characters long, contain letters and
    numbers,
    and
    must not contain spaces, special characters, or emoji.
</div>`;

export const input7 = ` <div className="row g-3 align-items-center">
<div className="col-auto">
    <Form.Label htmlFor="inputPassword6" className="col-form-label">Password</Form.Label>
</div>
<div className="col-auto">
    <Form.Control type="password" id="inputPassword6"
        aria-describedby="passwordHelpInline"/>
</div>
<div className="col-auto">
    <span id="passwordHelpInline" className="form-text">
        Must be 8-20 characters long.
    </span>
</div>
</div>`;

export const input8 = `<Form>
<fieldset disabled>
    <legend>Disabled fieldset example</legend>
    <div className="mb-3">
        <Form.Label htmlFor="disabledTextInput">Disabled
            input</Form.Label>
        <Form.Control type="text" id="disabledTextInput"
            placeholder="Disabled input" />
    </div>
    <div className="mb-3">
        <Form.Label htmlFor="disabledSelect">Disabled select
            menu</Form.Label>
        <select id="disabledSelect" className="form-select">
            <option>Disabled select</option>
        </select>
    </div>
    <div className="mb-3">
        <div className="form-check">
            <Form.Check type="checkbox" label="Can't check this" />
        </div>
    </div>
    <Button variant='' type="submit" className="btn btn-primary">Submit</Button>
</fieldset>
</Form>`;
/*------ inputs(prism-code for showcode purpose) end ------*/

/*------ checks & radios(prism-code for showcode purpose) start ------*/
export const radio1 = ` <Form.Check  label="Default checkbox"/>
<Form.Check defaultChecked     
 label="Checked checkbox"/>`;

export const radio2 = ` <Form.Check disabled  label="Disabled checkbox"/>
<Form.Check disabled defaultChecked
 label="Disabled checked checkbox"/>`;

export const radio3 = `<Form.Check type="radio"  label="Default radio"/>
<Form.Check type="radio" defaultChecked  
label="Default checked radio"/>`;

export const radio4 = `<Form.Check type="radio" disabled  label="Default radio"/>
<Form.Check type="radio" disabled defaultChecked 
 label="Default checked radio"/>`;

export const radio5 = `<Form.Check  label="Default checkbox"/>
<Form.Check disabled  label="Disabled checkbox"/>
<Form.Check type="radio"defaultChecked  label="Default checkbox"/>
<Form.Check type="radio" disabled  label="Disabled checkbox"/>`;

export const radio6 = `<Form.Check type="switch"  label="Default switch checkbox input"/>
<Form.Check type="switch" defaultChecked  label="Default switch checkbox input"/>
<Form.Check type="switch" disabled  label="Default switch checkbox input"/>
<Form.Check type="switch" disabled defaultChecked  label="Default checked switch checkbox input"/>`;

export const radio7 = `<Form.Check type="radio" className="btn-check" name="options"
id="option1" defaultChecked/>
<Button className="btn btn-primary m-1">Checked</Button>
<Form.Check type="radio" className="btn-check" name="options" 
id="option2" />
<Button className="btn btn-primary m-1">Radio</Button>
<Form.Check type="radio" className="btn-check" name="options" 
id="option3" disabled/>
<Button disabled className="btn btn-primary m-1">Disabled</Button>
<Form.Check type="radio" className="btn-check" name="options" 
id="option4"/>
<Button className="btn btn-primary m-1">Radio</Button>`;

export const radio8 = `<Form.Check type="checkbox" className="btn-check" id="btn-check"/>
<Button className="btn btn-primary m-1">Single toggle</Button>
<Form.Check type="checkbox" className="btn-check" id="btn-check-2" defaultChecked />
<Button className="btn btn-primary m-1">Checked</Button>
<Form.Check type="checkbox" className="btn-check" id="btn-check-3"disabled/>
<Button disabled className="btn btn-primary m-1">Disabled</Button>`;

export const radio9 = ` <Form.Check className="form-check-inline" type="checkbox" label="1"/>
<Form.Check className="form-check-inline" type="checkbox" label="2"/>
<Form.Check className="form-check-inline" disabled type="checkbox"
 label="3 (disabled)"/>
<Form.Check className="form-check-inline" type="radio" label="1"/>
<Form.Check className="form-check-inline" type="radio" label="2"/>
<Form.Check className="form-check-inline" disabled type="radio"
 label="3 (disabled)"/>`;

export const radio10 = `<span className="me-3">
<Form.Check className="" type="checkbox" /></span>
<span><Form.Check className="" type="radio" /></span>`;

export const radio11 = ` <Form.Check 
className="form-check-reverse mb-3"
 type="checkbox" 
 label="Reverse checkbox" />
<Form.Check 
className="form-check-reverse mb-3" 
type="checkbox" disabled 
label="Disabled reverse checkbox" />
<Form.Check 
className="form-check-reverse mb-3" 
type="switch" 
label="Reverse switch checkbox input" />`;

export const radio12 = `<Form.Control type="checkbox" 
className="btn-check"id="btn-check-outlined"/>
<Button variant='outline-primary' 
className="mb-3">Single toggle</Button><br/>
<Form.Check type="checkbox"
className="btn-check" id="btn-check-2-outlined" defaultChecked />
<Button variant='outline-secondary' 
className=" mb-3">Checked</Button><br/>
<Form.Check type="radio" className="btn-check" 
name="options-outlined" id="success-outlined"
 defaultChecked/>
<Button variant='outline-success' 
className="m-1">Checked success
radio</Button>
<Form.Check type="radio" className="btn-check"
 name="options-outlined" id="danger-outlined"
/>
<Button variant='outline-danger'className="m-1"
 >Danger radio</Button>`;

export const radio13 = `<Form.Check type="checkbox" defaultChecked  label="Default"/>
<Form.Check className="form-check-md d-flex align-items-center"
 type="checkbox" defaultChecked id="checkebox-md"  label="Medium"/>
<Form.Check className="form-check-lg d-flex align-items-center" 
type="checkbox" defaultChecked id="checkebox-lg"  label="Large"/>`;

export const radio14 = ` <Form.Check type="radio" label="Default"/>
<Form.Check type="radio" className="form-check-md" id="Radio-md"  label="Medium"/>
<Form.Check type="radio" className="form-check-lg" 
 defaultChecked id="Radio-lg"  label="Large"/>`;

export const radio15 = `<Form.Check type="switch" label="Default"/>
<Form.Check type="switch" className="form-check-md form-switch" id="switch-md"  label="Medium"/>
<Form.Check type="switch" className="form-check-lg form-switch" 
  id="switch-lg"  label="Large"/>`;

export const radio16 = `export default function BasicModal () {   
    const [secondary1, setsecondary1] = useState("on");
    const [success1, setsuccess1] = useState("on");
    const [dark1, setdark1] = useState("on");
    const [primary1, setprimary1] = useState("on");
    const [warning1, setwarning1] = useState("on");
    const [info1, setinfo1] = useState("on");
    const [danger1, setdanger1] = useState("on");
    const [light1, setlight1] = useState("on");
**Note: "Here In place of dolor we have given the dolor value."
return(
    <Row className="row gy-1">

    <Col xl={4}>
       <div className={toggle  00024{primary1}} onClick={() => { primary1 == "on" ? setprimary1("off") : setprimary1("on"); }}>
        <span></span>
        </div>
    </Col>
    <Col xl={4}>
    <div className={toggle mb-3  toggle-secondary 00024{secondary1}} onClick={() => { secondary1 == "on" ? setsecondary1("off") : setsecondary1("on"); }}>
        <span></span>
        </div>
    </Col>
    <Col xl={4}>
    <div className={toggle mb-3  toggle-warning 00024{warning1}} onClick={() => { warning1 == "on" ? setwarning1("off") : setwarning1("on"); }} >
        <span></span>
        </div>
    </Col>
</Row>
)}`;

export const radio17 = ` <div className="form-check form-switch mb-2">
<input type="radio" className="form-check-input  form-checked"
  id="primaryChecked"  role="switch"defaultChecked/>
  <label className="form-check-label" htmlFor="primaryChecked">
      Primary
  </label>
</div>
<div className="form-check form-switch mb-2">
<input type="radio" 
className="form-check-input  form-checked-secondary"
id="secondaryChecked"  role="switch"defaultChecked/>
<label className="form-check-label" htmlFor="primaryChecked">
   Secondary
</label>
</div>
<div className="form-check form-switch mb-2">
<input type="radio" 
className="form-check-input  form-checked-warning"
id="warningChecked"  role="switch"defaultChecked/>
<label className="form-check-label" htmlFor="primaryChecked">
   Warning
</label>
</div>
<div className="form-check form-switch mb-2">
<input type="radio" 
className="form-check-input  form-checked-info"
id="infoChecked"  role="switch"defaultChecked/>
<label className="form-check-label" htmlFor="primaryChecked">
   info
</label>
</div>`;

export const radio18 = ` <div className="d-flex align-items-center flex-wrap mb-3">
<div className=""> <p className="text-muted m-0">Small size toggle switch <code>toggle-sm</code></p></div>
<div className="toggle toggle-sm on mb-0">
    <span></span>
</div>
</div>
<div className="d-flex align-items-center flex-wrap mb-3">
<div className=""> <p className="text-muted m-0">Default toggle switch <code></code></p></div>
<div className="toggle toggle-secondary on mb-0">
    <span></span>
</div>
</div>
<div className="d-flex align-items-center flex-wrap">
<div className=""> <p className="text-muted m-0">Large size toggle switch <code>toggle-lg</code></p></div>
<div className="toggle toggle-lg toggle-success on mb-0">
    <span></span>
</div>
</div>`;

export const radio19 = `<div className="d-flex align-items-center flex-wrap mb-4">
<div className=""><p className="text-muted m-0">Small size toggle switch <code>toggle-sm</code></p></div>
<div className="custom-toggle-switch toggle-sm ms-2">
    <Form.Control id="size-sm" name="toggleswitchsize" type="checkbox" defaultChecked/>
    <Form.Label htmlFor="size-sm" className="label-primary"></Form.Label>
</div>
</div>
<div className="d-flex align-items-center flex-wrap mb-4">
<div className=""><p className="text-muted m-0">Default toggle switch</p></div>
<div className="custom-toggle-switch ms-2">
    <Form.Control id="size-default" name="toggleswitchsize" type="checkbox" defaultChecked/>
    <Form.Label htmlFor="size-default" className="label-secondary mb-1"></Form.Label>
</div>
</div>
<div className="d-sm-flex d-block align-items-center flex-wrap">
<div className="mb-sm-0 mb-2"><p className="text-muted m-0">Large size toggle switch <code>toggle-lg</code></p></div>
<div className="custom-toggle-switch toggle-lg ms-sm-2 ms-0">
    <Form.Control id="size-lg" name="toggleswitchsize" type="checkbox" defaultChecked/>
    <Form.Label htmlFor="size-lg" className="label-success mb-2"></Form.Label>
</div>
</div>`;

export const radio20 = ` <div className="form-check mb-2">
<input type="checkbox" value=""  className="form-check-input form-checked"
  id="primaryChecked" defaultChecked/>
  <label className="form-check-label" htmlFor="primaryChecked">
      Primary
  </label>
</div>
<div className="form-check mb-2">
<input type="checkbox" value="" 
className="form-check-input form-checked-secondary"
id="primaryChecked" defaultChecked/>
<label className="form-check-label" htmlFor="primaryChecked">
   Secondary
</label>
</div>
<div className="form-check mb-2">
<input type="checkbox" value="" 
className="form-check-input form-checked-warning"
id="primaryChecked" defaultChecked/>
<label className="form-check-label" htmlFor="primaryChecked">
   Warning
</label>
</div>
<div className="form-check mb-2">
<input type="checkbox" value="" 
className="form-check-input form-checked-info"
id="primaryChecked" defaultChecked/>
<label className="form-check-label" htmlFor="primaryChecked">
   info
</label>
</div>`;

export const radio21 = `<div className="form-check mb-2">
<input type="checkbox" className="form-check-input form-checked-outline"
  id="primaryChecked" defaultChecked/>
  <label className="form-check-label" htmlFor="primaryChecked">
      Primary
  </label>
</div>
<div className="form-check mb-2">
<input type="checkbox" value="" 
className="form-check-input form-checked-outline-secondary"
id="primaryChecked" defaultChecked/>
<label className="form-check-label" htmlFor="primaryChecked">
   Secondary
</label>
</div>
<div className="form-check mb-2">
<input type="checkbox" value="" 
className="form-check-input form-checked-outline-warning"
id="primaryChecked" defaultChecked/>
<label className="form-check-label" htmlFor="primaryChecked">
   Warning
</label>
</div>
<div className="form-check mb-2">
<input type="checkbox" value="" 
className="form-check-input form-checked-info"
id="primaryChecked" defaultChecked/>
<label className="form-check-label" htmlFor="primaryChecked">
   info
</label>
</div>`;

export const radio22 = ` <div className="form-check mb-2">
<input type="radio" className="form-check-input form-checked"
  id="primaryChecked" defaultChecked/>
  <label className="form-check-label" htmlFor="primaryChecked">
      Primary
  </label>
</div>
<div className="form-check mb-2">
<input type="radio" value="" 
className="form-check-input form-checked-secondary"
id="primaryChecked" defaultChecked/>
<label className="form-check-label" htmlFor="primaryChecked">
   Secondary
</label>
</div>
<div className="form-check mb-2">
<input type="radio" value="" 
className="form-check-input form-checked-warning"
id="primaryChecked" defaultChecked/>
<label className="form-check-label" htmlFor="primaryChecked">
   Warning
</label>
</div>
<div className="form-check mb-2">
<input type="radio" value="" 
className="form-check-input form-checked-info"
id="primaryChecked" defaultChecked/>
<label className="form-check-label" htmlFor="primaryChecked">
   info
</label>
</div>`;

export const radio23 = ` <div className="form-check mb-2">
<input type="radio" className="form-check-input form-checked-outline form-checked"
  id="primaryChecked" defaultChecked/>
  <label className="form-check-label" htmlFor="primaryChecked">
      Primary
  </label>
</div>
<div className="form-check mb-2">
<input type="radio" 
className="form-check-input form-checked-outline form-checked-secondary"
id="primaryChecked" defaultChecked/>
<label className="form-check-label" htmlFor="primaryChecked">
   Secondary
</label>
</div>
<div className="form-check mb-2">
<input type="radio" 
className="form-check-input form-checked-outline form-checked-warning"
id="primaryChecked" defaultChecked/>
<label className="form-check-label" htmlFor="primaryChecked">
   Warning
</label>
</div>
<div className="form-check mb-2">
<input type="radio" 
className="form-check-input form-checked-outline form-checked-info"
id="primaryChecked" defaultChecked/>
<label className="form-check-label" htmlFor="primaryChecked">
   info
</label>
</div>`;

export const radio24 = ` <div className="form-check form-switch mb-2">
<input type="radio" className="form-check-input  form-checked"
  id="primaryChecked"  role="switch"defaultChecked/>
  <label className="form-check-label" htmlFor="primaryChecked">
      Primary
  </label>
</div>
<div className="form-check form-switch mb-2">
<input type="radio" 
className="form-check-input  form-checked-secondary"
id="secondaryChecked"  role="switch"defaultChecked/>
<label className="form-check-label" htmlFor="primaryChecked">
   Secondary
</label>
</div>
<div className="form-check form-switch mb-2">
<input type="radio" 
className="form-check-input  form-checked-warning"
id="warningChecked"  role="switch"defaultChecked/>
<label className="form-check-label" htmlFor="primaryChecked">
   Warning
</label>
</div>
<div className="form-check form-switch mb-2">
<input type="radio" 
className="form-check-input  form-checked-info"
id="infoChecked"  role="switch"defaultChecked/>
<label className="form-check-label" htmlFor="primaryChecked">
   info
</label>
</div>`;
/*------ checks & radios(prism-code for showcode purpose) end ------*/

/*------ inputgroup(prism-code for showcode purpose) start ------*/
export const inputgroup1 = ` <InputGroup className="mb-3">
<InputGroup.Text className="" id="basic-addon1">@</InputGroup.Text>
<Form.Control type="text" className="" placeholder="Username"
    aria-label="Username" aria-describedby="basic-addon1"/>
</InputGroup>
<InputGroup className="mb-3">
<Form.Control type="text" className="" placeholder="Recipient's username"
    aria-label="Recipient's username" aria-describedby="basic-addon2"/>
<InputGroup.Text className="" id="basic-addon2">@example.com</InputGroup.Text>
</InputGroup>
<Form.Label htmlFor="basic-url" className="form-label">Your vanity URL</Form.Label>
<InputGroup className="mb-3">
<InputGroup.Text className=""
    id="basic-addon3">https://example.com/users/</InputGroup.Text>
<Form.Control type="text" className="" id="basic-url"
    aria-describedby="basic-addon3"/>
</InputGroup>
<InputGroup className="mb-3">
<InputGroup.Text className="">$</InputGroup.Text>
<Form.Control type="text" className=""
    aria-label="Amount (to the nearest dollar)"/>
<InputGroup.Text className="">.00</InputGroup.Text>
</InputGroup>
<InputGroup className="mb-3">
<Form.Control type="text" className="" placeholder="Username"
    aria-label="Username"/>
<InputGroup.Text className="">@</InputGroup.Text>
<Form.Control type="text" className="" placeholder="Server"
    aria-label="Server"/>
</InputGroup>
<InputGroup>
<InputGroup.Text className="">With textarea</InputGroup.Text>
<Form.Control as="textarea" className="" aria-label="With textarea"/>
</InputGroup>`;

export const inputgroup2 = `<InputGroup className="input-group-sm mb-3">
<InputGroup.Text className="" id="inputGroup-sizing-sm">Small</InputGroup.Text>
<Form.Control type="text" className="form-control"
    aria-label="Sizing example input"            
    aria-describedby="inputGroup-sizing-sm"/>
</InputGroup>
<InputGroup className="mb-3">
<InputGroup.Text className=""
    id="inputGroup-sizing-default">Default</InputGroup.Text>
<Form.Control type="text" className="form-control"
    aria-label="Sizing example input"            
    aria-describedby="inputGroup-sizing-default"/>
</InputGroup>
<InputGroup className="input-group-lg">
<InputGroup.Text className="" id="inputGroup-sizing-lg">Large</InputGroup.Text>
<Form.Control type="text" className="form-control"
    aria-label="Sizing example input"            
    aria-describedby="inputGroup-sizing-lg"/>
</InputGroup>`;

export const inputgroup3 = `<InputGroup className="mb-3">
<Button variant='primary' className="" type="button"
    id="button-addon1">Button</Button>
<Form.Control type="text" className="" placeholder=""
    aria-label="Example text with button addon"
    aria-describedby="button-addon1"/>
</InputGroup>
<InputGroup className="mb-3">
<Form.Control type="text" className="" placeholder="Recipient's username"
    aria-label="Recipient's username" aria-describedby="button-addon2"/>
<Button variant='primary' className="" type="button"
    id="button-addon2">Button</Button>
</InputGroup>
<InputGroup className="mb-3">
<Button variant='primary' className="" type="button">Button</Button>
<Button variant='primary' className="" type="button">Button</Button>
<Form.Control type="text" className="" placeholder=""
    aria-label="Example text with two button addons"/>
</InputGroup>
<InputGroup>
<Form.Control type="text" className="" placeholder="Recipient's username"
    aria-label="Recipient's username with two button addons"/>
<Button variant='primary' className="" type="button">Button</Button>
<Button variant='primary' className="" type="button">Button</Button>
</InputGroup>`;

export const inputgroup4 = `<InputGroup className="mb-3">
<Dropdown>
<Dropdown.Toggle variant='' className="btn btn-primary dropdown-toggle" type="button"
     data-bs-toggle="dropdown" aria-expanded="false">Dropdown</Dropdown.Toggle>
 <Dropdown.Menu className="">
     <Dropdown.Item href="#">Action</Dropdown.Item>
     <Dropdown.Item href="#">Another action</Dropdown.Item>
     <Dropdown.Item href="#">Something else here</Dropdown.Item>
     <Dropdown.Divider>
     </Dropdown.Divider>
     <Dropdown.Item href="#">Separated link</Dropdown.Item>
 </Dropdown.Menu>
</Dropdown>
 <Form.Control type="text" className="form-control"
     aria-label="Text input with dropdown button"/>
</InputGroup>
<InputGroup className="mb-3">
 <Form.Control type="text" className="form-control"
     aria-label="Text input with dropdown button"/>
<Dropdown>
<Dropdown.Toggle variant='' className="btn btn-outline-primary dropdown-toggle" type="button"
     data-bs-toggle="dropdown" aria-expanded="false">Dropdown</Dropdown.Toggle>
 <Dropdown.Menu className="">
     <Dropdown.Item href="#">Action</Dropdown.Item>
     <Dropdown.Item href="#">Another action</Dropdown.Item>
     <Dropdown.Item href="#">Something else here</Dropdown.Item>
     <Dropdown.Divider>
     </Dropdown.Divider>
     <Dropdown.Item href="#">Separated link</Dropdown.Item>
 </Dropdown.Menu>
</Dropdown>
</InputGroup>
<InputGroup>
<Dropdown>
<Dropdown.Toggle variant='' className="btn btn-primary-transparent dropdown-toggle" type="button"
     data-bs-toggle="dropdown" aria-expanded="false">Dropdown</Dropdown.Toggle>
 <Dropdown.Menu className="">
     <Dropdown.Item href="#">Action</Dropdown.Item>
     <Dropdown.Item href="#">Another action</Dropdown.Item>
     <Dropdown.Item href="#">Something else here</Dropdown.Item>
     <Dropdown.Divider>
     </Dropdown.Divider>
     <Dropdown.Item href="#">Separated link</Dropdown.Item>
 </Dropdown.Menu>
</Dropdown>
 <Form.Control type="text" className=""
     aria-label="Text input with 2 dropdown buttons"/>
 <Dropdown>
<Dropdown.Toggle variant='' className="btn btn-primary-transparent dropdown-toggle" type="button"
     data-bs-toggle="dropdown" aria-expanded="false">Dropdown</Dropdown.Toggle>
 <Dropdown.Menu className="">
     <Dropdown.Item href="#">Action</Dropdown.Item>
     <Dropdown.Item href="#">Another action</Dropdown.Item>
     <Dropdown.Item href="#">Something else here</Dropdown.Item>
     <Dropdown.Divider>
     </Dropdown.Divider>
     <Dropdown.Item href="#">Separated link</Dropdown.Item>
 </Dropdown.Menu>
</Dropdown>
</InputGroup>`;

export const inputgroup5 = ` <InputGroup className="mb-3">
<label className="input-group-text" htmlFor="inputGroupFile01">Upload</label>
<Form.Control type="file" className="form-control" id="inputGroupFile01"/>
</InputGroup>

<InputGroup className="mb-3">
<Form.Control type="file" className="form-control" id="inputGroupFile02"/>
<label className="input-group-text" htmlFor="inputGroupFile02">Upload</label>
</InputGroup>

<InputGroup className="mb-3">
<Button variant='' className="btn btn-primary" type="button"
    id="inputGroupFileAddon03">Button</Button>
<Form.Control type="file" className="form-control" id="inputGroupFile03"
    aria-describedby="inputGroupFileAddon03" aria-label="Upload"/>
</InputGroup>

<InputGroup>
<Form.Control type="file" className="form-control" id="inputGroupFile04"
    aria-describedby="inputGroupFileAddon04" aria-label="Upload"/>
<Button variant='' className="btn btn-primary" type="button"
    id="inputGroupFileAddon04">Button</Button>
</InputGroup>`;

export const inputgroup6 = `  <InputGroup>
<InputGroup.Text className="">First and last name</InputGroup.Text>
<Form.Control type="text" aria-label="First name" className=""/>
<Form.Control type="text" aria-label="Last name" className=""/>
</InputGroup>`;

export const inputgroup7 = ` <InputGroup className="mb-3">
<InputGroup.Text className="">
    <Form.Check  className=" mt-0" type="checkbox" value=""
        aria-label="Checkbox for following text input"/>
</InputGroup.Text>
<Form.Control type="text" className=""
    aria-label="Text input with checkbox"/>
</InputGroup>
<InputGroup>
<InputGroup.Text className="">
    <Form.Check className=" mt-0" type="radio" value=""
        aria-label="Radio button for following text input"/>
</InputGroup.Text>
<Form.Control type="text" className=""
    aria-label="Text input with radio button"/>
</InputGroup>`;

export const inputgroup8 = `<InputGroup className="mb-3">
<InputGroup.Text className="">
    <Form.Check className="mt-0" type="checkbox" value=""
        aria-label="Checkbox for following text input"/>
</InputGroup.Text>
<Form.Control type="text" className=""
    aria-label="Text input with checkbox"/>
</InputGroup>
<InputGroup>
<InputGroup.Text className="">
    <Form.Check className="mt-0" type="radio" value=""
        aria-label="Radio button for following text input"/>
</InputGroup.Text>
<Form.Control type="text" className=""
    aria-label="Text input with radio button"/>
</InputGroup>`;

export const inputgroup9 = ` <InputGroup className="mb-3">
<Button variant='primary' type="button" className="">Action</Button>
<Dropdown>
<Dropdown.Toggle type="button"
    className="btn btn-primary dropdown-toggle dropdown-toggle-split"
    data-bs-toggle="dropdown" aria-expanded="false">
    <span className="visually-hidden">Toggle Dropdown</span>
</Dropdown.Toggle>
<Dropdown.Menu className="">
    <Dropdown.Item href="#">Action</Dropdown.Item>
    <Dropdown.Item href="#">Another action</Dropdown.Item>
    <Dropdown.Item href="#">Something else here</Dropdown.Item>
   <Dropdown.Divider/>
    <Dropdown.Item href="#">Separated link</Dropdown.Item>
</Dropdown.Menu>
</Dropdown>
<Form.Control type="text" className=""
    aria-label="Text input with segmented dropdown button"/>
</InputGroup>
<InputGroup>
<Form.Control type="text" className=""
    aria-label="Text input with segmented dropdown button"/>
<Button type="button" className="btn btn-primary">Action</Button>
<Dropdown>
<Dropdown.Toggle variant='' type="button"
    className="btn btn-primary dropdown-toggle dropdown-toggle-split"
    data-bs-toggle="dropdown" aria-expanded="false">
    <span className="visually-hidden">Toggle Dropdown</span>
</Dropdown.Toggle>
<Dropdown.Menu className="dropdown-menu-end">
    <Dropdown.Item href="#">Action</Dropdown.Item>
    <Dropdown.Item href="#">Another action</Dropdown.Item>
    <Dropdown.Item href="#">Something else here</Dropdown.Item>
    <Dropdown.Divider/>
    <Dropdown.Item href="#">Separated link</Dropdown.Item>
</Dropdown.Menu>
</Dropdown>
</InputGroup>`;

export const inputgroup10 = `<InputGroup className="mb-3">
<label className="input-group-text" htmlFor="inputGroupSelect01">Options</label>
<Select  name="colors" options={Selectdata1} className="basic-multi-select flex-grow-1"
menuPlacement='auto' classNamePrefix="Select2" defaultValue={[Selectdata1[0]]}/>
</InputGroup>
<InputGroup className="mb-3">
<Select  name="colors" options={Selectdata1} className="basic-multi-select flex-grow-1"
menuPlacement='auto' classNamePrefix="Select2" defaultValue={[Selectdata1[0]]} />
<label className="input-group-text" htmlFor="inputGroupSelect02">Options</label>
 </InputGroup>
<InputGroup className="mb-3">
<Button variant='' className="btn btn-primary" type="button">Button</Button>
<Select  name="colors" options={Selectdata1} className="basic-multi-select flex-grow-1"
menuPlacement='auto' classNamePrefix="Select2" defaultValue={[Selectdata1[0]]} />
</InputGroup>
<InputGroup>
<Select  name="colors" options={Selectdata1} className="basic-multi-select flex-grow-1"
menuPlacement='auto' classNamePrefix="Select2" defaultValue={[Selectdata1[0]]} />
<Button variant='' className="btn btn-primary" type="button">Button</Button>
</InputGroup>`;

export const inputgroup11 = ` <InputGroup className="flex-nowrap">
<InputGroup.Text className="" id="addon-wrapping">@</InputGroup.Text>
<Form.Control type="text" className="" placeholder="Username"
    aria-label="Username" aria-describedby="addon-wrapping"/>
</InputGroup>`;
/*------ inputgroup(prism-code for showcode purpose) end ------*/

/*------ formselect(prism-code for showcode purpose) start ------*/
export const formselect1 = `<Form.Select aria-label="Default select example">
<option>Open this select menu</option>
<option value="1">One</option>
<option value="2">Two</option>
<option value="3">Three</option>
</Form.Select>`;

export const formselect2 = `<Form.Select aria-label="Default select example" disabled={true}>
<option>Open this select menu</option>
<option value="1">One</option>
<option value="2">Two</option>
<option value="3">Three</option>
</Form.Select>`;

export const formselect3 = `<Form.Select className="form-select rounded-pill" aria-label="Default select example">
<option>Open this select menu</option>
<option value="1">One</option>
<option value="2">Two</option>
<option value="3">Three</option>
</Form.Select>`;

export const formselect4 = `<Form.Select size="sm" className="form-select form-select-sm mb-3" aria-label=".form-select-sm example">
<option>Open this select menu</option>
<option defaultValue="1">One</option>
<option defaultValue="2">Two</option>
<option defaultValue="3">Three</option>
</Form.Select>
<Form.Select className="form-select mb-3" aria-label="Default select">
<option>Open this select menu
</option>
<option defaultValue="1">One</option>
<option defaultValue="2">Two</option>
<option defaultValue="3">Three</option>
</Form.Select>
<Form.Select size="lg" className="form-select form-select-lg"
aria-label=".form-select-lg example">
<option>Open this select menu</option>
<option defaultValue="1">One</option>
<option defaultValue="2">Two</option>
<option defaultValue="3">Three</option>
</Form.Select>`;

export const formselect5 = `<Form.Select multiple className="form-select"  aria-label="multiple select example">
<option className='selected'>Open this select menu</option>
<option defaultValue="1">One</option>
<option defaultValue="2">Two</option>
<option defaultValue="3">Three</option>
</Form.Select>`;

export const formselect6 = `<Form.Select className="form-select" htmlSize={4} aria-label="size 3 select example">
<option className='selected'>Open this select menu</option>
<option defaultValue="1">One</option>
<option defaultValue="2">Two</option>
<option defaultValue="3">Three</option>
<option defaultValue="4">Four</option>
<option defaultValue="5">Five</option>
</Form.Select>`;
/*------ formselect(prism-code for showcode purpose) end ------*/

/*------ rangeslider(prism-code for showcode purpose) start ------*/
export const rangeslider1 = "<Form.Range  className=\"\" id=\"customRange1\"/>";

export const rangeslider2 = ` <Form.Range  className="" 
id="disabledRange" disabled/>`;

export const rangeslider3 = `<Form.Range  className="" min="0" max="5"
id="customRange2"/>`;

export const rangeslider4 = `<Form.Range  className="" min="0" max="5"
step="0.5" id="customRange3"/>`;
/*------ rangeslider(prism-code for showcode purpose) end ------*/

/*------ fileuploads(prism-code for showcode purpose) start ------*/
export const fileupload1 = `<Form.Group controlId="formFile" className="mb-3">
<Form.Label>Default file input example</Form.Label>
<Form.Control type="file" />
</Form.Group>
<Form.Group controlId="formFileMultiple" className="mb-3">
<Form.Label>Multiple files input example</Form.Label>
<Form.Control type="file" multiple />
</Form.Group>
<Form.Group controlId="formFileDisabled" className="mb-3">
<Form.Label>Disabled file input example</Form.Label>
<Form.Control type="file" disabled />
</Form.Group>
<Form.Group controlId="formFileSm" className="mb-3">
<Form.Label>Small file input example</Form.Label>
<Form.Control type="file" size="sm" />
</Form.Group>
<Form.Group controlId="formFileLg" className="mb-3">
<Form.Label>Large file input example</Form.Label>
<Form.Control type="file" size="lg" />
</Form.Group>`;
/*------ fileuploads(prism-code for showcode purpose) end ------*/

/*------ colorpicker(prism-code for showcode purpose) start ------*/
export const colorpicker1 = ` <Form.Label htmlFor="exampleColorInput">
Color picker</Form.Label>
<Form.Control type="color" 
id="exampleColorInput"  
defaultValue="#136ad0" 
title="Choose your color"
/>`;
/*------ colorpicker(prism-code for showcode purpose) end ------*/

/*------ floating lables(prism-code for showcode purpose) start ------*/
export const floating1 = ` <FloatingLabel
controlId="floatingInput"
label="Email address"
className="mb-3">
<Form.Control type="email" placeholder="name@example.com" />
</FloatingLabel>
<FloatingLabel controlId="floatingPassword" label="Password">
<Form.Control type="password" placeholder="Password" />
</FloatingLabel>`;

export const floating2 = ` <Form.Floating className="mb-3">
<Form.Control type="email" readOnly
className="form-control-plaintext"
    id="floatingEmptyPlaintextInput" placeholder="name@example.com"/>
<Form.Label htmlFor="floatingEmptyPlaintextInput">Empty input</Form.Label>
</Form.Floating>
<Form.Floating className="">
<Form.Control type="email"  readOnly
 className="form-control-plaintext"
    id="floatingPlaintextInput" placeholder="name@example.com"
    defaultValue="name@example.com"/>
<Form.Label htmlFor="floatingPlaintextInput">Input with value</Form.Label>
</Form.Floating>`;

export const floating3 = `<Form.Floating className="my-3">
<Form.Control type="email" className="form-control" id="floatingInputValue"
    placeholder="name@example.com" defaultValue="test@example.com"/>
<Form.Label htmlFor="floatingInputValue">Input with value</Form.Label>
</Form.Floating>
<form className="form-flotin">
<Form.Control type="email" className="is-invalid"
    id="floatingInputInvalid" placeholder="name@example.com"
    defaultValue="test@example.com"/>
<Form.Label htmlFor="floatingInputInvalid">Invalid input</Form.Label>
</form>`;

export const floating4 = ` <FloatingLabel
controlId="floatingInput"
label="Email address"
className="mb-3">
<Form.Control type="email" placeholder="name@example.com" />
</FloatingLabel>
<FloatingLabel controlId="floatingPassword" label="Password">
<Form.Control type="password" placeholder="Password" />
</FloatingLabel>`;

export const floating5 = ` <FloatingLabel controlId="floatingSelect" label="Works with selects">
<Form.Select aria-label="Floating label select example">
    <option>Open this select menu</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
</Form.Select>
</FloatingLabel>`;

export const floating6 = `  <div className="row g-2">
<div className="col-md">
    <Form.Floating className="">
        <Form.Control type="email" className="form-control" id="floatingInputGrid"
            placeholder="name@example.com" defaultValue="mdo@example.com"/>
        <Form.Label htmlFor="floatingInputGrid">Email address</Form.Label>
    </Form.Floating>
</div>
<div className="col-md">
<FloatingLabel controlId="floatingSelect" label="Works with selects">
    <Form.Select aria-label="Floating label select example" className='form-select'>
        <option>Open this select menu</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
    </Form.Select>
    </FloatingLabel>
</div>
</div>`;

export const floating7 = `<Row className="gy-4">
<Col xl={4} className="">
    <Form.Floating className="mb-4 floating-primary">
        <Form.Control type="email" className="" id="floatingInputprimary" placeholder="name@example.com"/>
        <Form.Label htmlFor="floatingInputprimary">primary</Form.Label>
    </Form.Floating>
</Col>
<Col xl={4} className="">
    <Form.Floating className="mb-4 floating-secondary">
        <Form.Control type="email" className="" id="floatingInputsecondary" placeholder="name@example.com"/>
        <Form.Label htmlFor="floatingInputsecondary">secondary</Form.Label>
    </Form.Floating>
</Col>
<Col xl={4} className="">
    <Form.Floating className="mb-4 floating-warning">
        <Form.Control type="email" className="" id="floatingInputwarning" placeholder="name@example.com"/>
        <Form.Label htmlFor="floatingInputwarning">warning</Form.Label>
    </Form.Floating>
</Col>
<Col xl={4} className="">
    <Form.Floating className="mb-4 floating-info">
        <Form.Control type="email" className="" id="floatingInputinfo" placeholder="name@example.com"/>
        <Form.Label htmlFor="floatingInputinfo">info</Form.Label>
    </Form.Floating>
</Col>
<Col xl={4} className="">
    <Form.Floating className="mb-4 floating-success">
        <Form.Control type="email" className="" id="floatingInputsuccess" placeholder="name@example.com"/>
        <Form.Label htmlFor="floatingInputsuccess">success</Form.Label>
    </Form.Floating>
</Col>
<Col xl={4} className="">
    <Form.Floating className="mb-4 floating-danger">
        <Form.Control type="email" className="" id="floatingInputdanger" placeholder="name@example.com"/>
        <Form.Label htmlFor="floatingInputdanger">danger</Form.Label>
    </Form.Floating>
</Col>
</Row>`;
/*------ floating lables(prism-code for showcode purpose) end ------*/

/*------ form layouts(prism-code for showcode purpose) start ------*/
export const layout1 = ` <div className="mb-3">
<Form.Label htmlFor="form-text" className=" fs-14 text-dark">Enter name</Form.Label>
<Form.Control type="text" className="" id="form-text" placeholder=""/>
</div>
<div className="mb-3">
<Form.Label htmlFor="form-password" className="fs-14 text-dark">Enter
    Password</Form.Label>
<Form.Control type="password" className="" id="form-password" placeholder=""/>
</div>
<Form.Check className="" type="checkbox" value="" id="invalidCheck" label="Accept Policy"
    required/>
<Button variant='primary' className="" type="submit">Submit</Button>`;

export const layout2 = ` <div className="mb-3">
<Form.Label htmlFor="form-text" className=" fs-14 text-dark">Enter name</Form.Label>
<Form.Control type="text" className="" id="form-text" placeholder=""/>
</div>
<div className="mb-3">
<Form.Label htmlFor="form-password" className="fs-14 text-dark">Enter
    Password</Form.Label>
<Form.Control type="password" className="" id="form-password" placeholder=""/>
</div>
<Form.Check className="" type="checkbox" value="" id="invalidCheck" label="Accept Policy"
    required/>
<Button variant='primary' className="" type="submit">Submit</Button>`;

export const layout3 = `<Form className="row row-cols-lg-auto g-3 align-items-center">
<div className="col-12">
    <label className="visually-hidden"
        htmlFor="inlineFormInputGroupUsername">Username</label>
    <InputGroup>
        <InputGroup.Text className="input-group-text">@</InputGroup.Text>
        <Form.Control type="text" className="form-control"
            id="inlineFormInputGroupUsername" placeholder="Username"/>
    </InputGroup>
</div>
<div className="col-12">
    <label className="visually-hidden"
        htmlFor="inlineFormSelectPref">Preference</label>
    <Form.Select className="form-select" id="inlineFormSelectPref" defaultValue="Choose...">
        <option >Choose...</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
    </Form.Select>
</div>
<div className="col-12">
    <Form.Check type='checkbox' label="Remember me" />
</div>

<div className="col-12">
    <Button type="submit" variant='primary' className="">Submit</Button>
</div>
</Form>`;

export const layout4 = `<Row className="g-3">
<Col sm={7} className="">
    <Form.Control type="text" className="" placeholder="City"
        aria-label="City"/>
</Col>
<div className="col-sm">
    <Form.Control type="text" className="" placeholder="State"
        aria-label="State"/>
</div>
<div className="col-sm">
    <Form.Control type="text" className="" placeholder="Zip"
        aria-label="Zip"/>
</div>
</Row>`;

export const layout5 = ` <div className="mb-3">
<Form.Label htmlFor="formGroupExampleInput" className="">Example label</Form.Label>
<Form.Control type="text" className="" id="formGroupExampleInput"
    placeholder="Example input placeholder"/>
</div>
<div className="mb-1">
<Form.Label htmlFor="formGroupExampleInput2" className="">Another label</Form.Label>
<Form.Control type="text" className="" id="formGroupExampleInput2"
    placeholder="Another input placeholder"/>
</div>`;

export const layout6 = `<Row className="mb-3">
<Form.Label htmlFor="colFormLabelSm" column="sm" sm={2}
    className="col-sm-2 col-form-label col-form-label-sm">Email</Form.Label>
<Col sm={10}>
    <Form.Control type="email" className="form-control-sm" size="sm"
        id="colFormLabelSm" placeholder="col-form-label-sm"/>
</Col>
</Row>
<Row className="mb-3">
<Form.Label column="sm" sm={2} htmlFor="colFormLabel" className="col-sm-2 col-form-label">Email</Form.Label>
<Col sm={10}>
    <Form.Control type="email" className="" id="colFormLabel"
        placeholder="col-form-label"/>
</Col>
</Row>
<Row>
<label htmlFor="colFormLabelLg"
    className="col-sm-2 col-form-label col-form-label-lg">Email</label>
<Col sm={10}>
    <Form.Control type="email" className="form-control-lg" size="lg"
        id="colFormLabelLg" placeholder="col-form-label-lg"/>
</Col>
</Row>`;

export const layout7 = `<div className="mb-3">
<Form.Label htmlFor="form-text1" className=" fs-14 text-dark">Enter name</Form.Label>
<InputGroup>
    <InputGroup.Text className=""><i className="ri-user-line"></i></InputGroup.Text>
    <Form.Control type="text" className="" id="form-text1" placeholder=""/>
</InputGroup>
</div>
<div className="mb-3">
<Form.Label htmlFor="form-password1" className=" fs-14 text-dark">Enter
    Password</Form.Label>
<InputGroup>
    <InputGroup.Text className=""><i className="ri-lock-line"></i></InputGroup.Text>
    <Form.Control type="password" className="" id="form-password1" placeholder=""/>
</InputGroup>
</div>`;

export const layout8 = `<Form>
<Row className="mb-3">
    <label htmlFor="inputEmail1"
        className="col-sm-2 col-form-label">Email</label>
    <Col sm={10}>
        <InputGroup>
            <Form.Control type="email" className="form-control" id="inputEmail1"/>
            <InputGroup.Text className="input-group-text">
                <i className="ri-mail-line"></i>
            </InputGroup.Text>
        </InputGroup>
    </Col>
</Row>
<Row className="row mb-3">
    <label htmlFor="inputPassword1"
        className="col-sm-2 col-form-label">Password</label>
    <Col sm={10}>
        <InputGroup>
            <Form.Control type="password" className="form-control" id="inputPassword1"/>
            <InputGroup.Text className="input-group-text">
                <i className="ri-lock-line"></i>
            </InputGroup.Text>
        </InputGroup>
    </Col>
</Row>
<fieldset className="row mb-3">
    <legend className="col-form-label col-sm-2 pt-0">Qualified</legend>
    <Col sm={10}>
        <Form.Check defaultChecked type="radio"label="Prelims"name="formHorizontalRadios"id="formHorizontalRadios1"/>
        <Form.Check disabled type="radio"label="Mains"name="formHorizontalRadios"id="formHorizontalRadios2"/>
        <Form.Check type="checkbox"label="Certified"name="formHorizontalRadios"id="formHorizontalRadios3"/>
    </Col>
</fieldset>
<Button variant='' type="submit" className="btn btn-primary">Sign in</Button>
</Form>`;

export const layout9 = ` <Form>
<Row className="align-items-center">
    <Col xs="auto">
    <Form.Label htmlFor="inlineFormInput" visuallyHidden>
        Name
    </Form.Label>
    <Form.Control
        className="mb-2"
        id="inlineFormInput"
        placeholder="Jane Doe"
    />
    </Col>
    <Col xs="auto">
    <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
        Username
    </Form.Label>
    <InputGroup className="mb-2">
        <InputGroup.Text>@</InputGroup.Text>
        <Form.Control id="inlineFormInputGroup" placeholder="Username" />
    </InputGroup>
    </Col>
    <Col className="col-auto">
        <label className="visually-hidden"
            htmlFor="autoSizingSelect">Preference</label>
        <Form.Select className="form-select" id="autoSizingSelect">
            <option >Choose...</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
        </Form.Select>
    </Col>
    <Col xs="auto">
    <Form.Check
        type="checkbox"
        id="autoSizingCheck"
        className="mb-2"
        label="Remember me"
    />
    </Col>
    <Col xs="auto">
    <Button type="submit" className="mb-2">
        Submit
    </Button>
    </Col>
</Row>
</Form>
<span className="fw-semibold mb-1 text-muted">You can then remix that once again with size-specific column
    classes.</span>
<Form className="row gx-3 gy-2 align-items-center mt-0">
    <Col sm={3} className="">
        <label className="visually-hidden"
            htmlFor="specificSizeInputName">Name</label>
        <Form.Control type="text" className="form-control" id="specificSizeInputName"
            placeholder="Jane Doe"/>
    </Col>
    <Col sm={3} className="">
        <label className="visually-hidden"
            htmlFor="specificSizeInputGroupUsername">Username</label>
        <InputGroup>
            <InputGroup.Text className="input-group-text">@</InputGroup.Text>
            <Form.Control type="text" className="form-control"
                id="specificSizeInputGroupUsername" placeholder="Username"/>
        </InputGroup>
    </Col>
    <Col sm={3} className="">
        <label className="visually-hidden"
            htmlFor="specificSizeSelect">Preference</label>
        <Form.Select className="form-select" id="specificSizeSelect">
            <option >Choose...</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
        </Form.Select>
    </Col>
    <div className="col-auto">
    <Form.Check
        type="checkbox"
        id="autoSizingCheck"
        className="mb-2"
        label="Remember me"
    />
    </div>
    <div className="col-auto">
        <Button type="submit" className="btn btn-primary">Submit</Button>
    </div>
</Form>`;

export const layout10 = `<Row>
<Col md={6} className="mb-3">
    <Form.Label className="">First Name</Form.Label>
    <Form.Control type="text" className="form-control" placeholder="First name"
        aria-label="First name"/>
</Col>
<Col md={6} className="mb-3">
    <Form.Label className="">Last Name</Form.Label>
    <Form.Control type="text" className="form-control" placeholder="Last name"
        aria-label="Last name"/>
</Col>
<Col md={6} className="mb-3">
    <Form.Label className="">Address</Form.Label>
    <Row>
        <Col xl={12}  className="mb-3">
            <Form.Control type="text" className="" placeholder="Street"
            aria-label="Street"/>
        </Col>
        <Col xl={12}  className="mb-3">
            <Form.Control type="text" className="" placeholder="Landmark"
            aria-label="Landmark"/>
        </Col>
        <Col xxl={6}  xl={12} className="mb-3">
            <Form.Control type="text" className="" placeholder="City"
            aria-label="City"/>
        </Col>
        <Col xxl={6}  xl={12} className="mb-3">
            <Form.Select id="inputState1" className="form-select">
                <option>State</option>
                <option>...</option>
            </Form.Select>
        </Col>
        <Col xxl={6}  xl={12} className="mb-3">
            <Form.Control type="text" className="" placeholder="Postal/Zip code"
            aria-label="Postal/Zip code"/>
        </Col>
        <Col xxl={6}  xl={12} className="mb-3">
            <Form.Select id="inputCountry" className="form-select">
                <option>Country</option>
                <option>...</option>
            </Form.Select>
        </Col>
    </Row>
</Col>
<Col md={6} className="mb-3">
    <Row>
        <Col xl={12}  className="mb-3">
            <Form.Label className="">Email</Form.Label>
            <Form.Control type="email" className="" placeholder="Email"
            aria-label="email"/>
        </Col>
        <Col xl={12}  className="mb-3">
            <Form.Label className="">D.O.B</Form.Label>
            <Form.Control type="date" className=""
            aria-label="dateofbirth"/>
        </Col>
        <Col xl={12}  className="mb-3">
            <Row>
                <Form.Label className=" mb-1">Maritial Status</Form.Label>
                <Col xl={6}>
                    <Form.Check type="checkbox" label="Married" />
                </Col>
                <Col xl={6}>
                    <Form.Check type="checkbox" label="Single" />
                </Col>
            </Row>
        </Col>
        <Col xl={12}>

        </Col>
    </Row>
</Col>
<Col md={6} className="mb-3">
    <Form.Label className="">Contact Number</Form.Label>
    <Form.Control type="number" className="" placeholder="Phone number"
        aria-label="Phone number"/>
</Col>
<Col md={6} className="mb-3">
    <Form.Label className="">Alternative Contact</Form.Label>
    <Form.Control type="number" className="" placeholder="Phone number"
        aria-label="Phone number"/>
</Col>
<Col md={12} className="">
    <Form.Check className='mb-3' type="checkbox" label="Check me out" />
</Col>
<Col md={12}>
    <Button type="submit" variant='primary' className="">Sign in</Button>
</Col>
</Row>`;

export const layout11 = `<Form className="row g-3 mt-0">
<Col md={6}>
    <Form.Label className="">First Name</Form.Label>
    <Form.Control type="text" className="" placeholder="First name"
        aria-label="First name"/>
</Col>
<Col md={6}>
    <Form.Label className="">Last Name</Form.Label>
    <Form.Control type="text" className="" placeholder="Last name"
        aria-label="Last name"/>
</Col>
<Col md={6}>
    <Form.Label htmlFor="inputEmail4" className="">Email</Form.Label>
    <Form.Control type="email" className="" id="inputEmail4"/>
</Col>
<Col md={6}>
    <Form.Label htmlFor="inputPassword4" className="">Password</Form.Label>
    <Form.Control type="password" className="" id="inputPassword4"/>
</Col>
<div className="col-12">
    <Form.Label htmlFor="inputAddress" className="">Address</Form.Label>
    <Form.Control type="text" className="" id="inputAddress"
        placeholder="1234 Main St"/>
</div>
<div className="col-12">
    <Form.Label htmlFor="inputAddress2" className="">Address 2</Form.Label>
    <Form.Control type="text" className="" id="inputAddress2"
        placeholder="Apartment, studio, or floor"/>
</div>
<Col md={6}>
    <Form.Label htmlFor="inputCity" className="">City</Form.Label>
    <Form.Control type="text" className="" id="inputCity"/>
</Col>
<Col md={4}>
    <Form.Label htmlFor="inputState" className="">State</Form.Label>
    <Form.Select id="inputState" className="form-select-lg">
        <option>Choose...</option>
        <option>...</option>
    </Form.Select>
</Col>
<Col md={2}>
    <Form.Label htmlFor="inputZip" className="">Zip</Form.Label>
    <Form.Control type="text" className="form-control" id="inputZip"/>
</Col>
<div className="col-12">
    <Form.Check type="checkbox" label="Check me out" />
</div>
<div className="col-12">
    <Button variant='primary' type="submit" className="">Sign in</Button>
</div>
</Form>`;

export const layout12 = `<Form className="row g-3 mt-0">
<Col md={6}>
    <Form.Label className="">First Name</Form.Label>
    <Form.Control type="text" className="" placeholder="First name"
        aria-label="First name"/>
</Col>
<Col md={6}>
    <Form.Label className="">Last Name</Form.Label>
    <Form.Control type="text" className="" placeholder="Last name"
        aria-label="Last name"/>
</Col>
<Col md={6}>
    <Form.Label htmlFor="inputEmail4" className="">Email</Form.Label>
    <Form.Control type="email" className="" id="inputEmail4"/>
</Col>
<Col md={6}>
    <Form.Label htmlFor="inputPassword4" className="">Password</Form.Label>
    <Form.Control type="password" className="" id="inputPassword4"/>
</Col>
<div className="col-12">
    <Form.Label htmlFor="inputAddress" className="">Address</Form.Label>
    <Form.Control type="text" className="" id="inputAddress"
        placeholder="1234 Main St"/>
</div>
<div className="col-12">
    <Form.Label htmlFor="inputAddress2" className="">Address 2</Form.Label>
    <Form.Control type="text" className="" id="inputAddress2"
        placeholder="Apartment, studio, or floor"/>
</div>
<Col md={6}>
    <Form.Label htmlFor="inputCity" className="">City</Form.Label>
    <Form.Control type="text" className="" id="inputCity"/>
</Col>
<Col md={4}>
    <Form.Label htmlFor="inputState" className="">State</Form.Label>
    <Form.Select id="inputState" className="form-select-lg">
        <option>Choose...</option>
        <option>...</option>
    </Form.Select>
</Col>
<Col md={2}>
    <Form.Label htmlFor="inputZip" className="">Zip</Form.Label>
    <Form.Control type="text" className="form-control" id="inputZip"/>
</Col>
<div className="col-12">
    <Form.Check type="checkbox" label="Check me out" />
</div>
<div className="col-12">
    <Button variant='primary' type="submit" className="">Sign in</Button>
</div>
</Form>`;
/*------ form layouts(prism-code for showcode purpose) end ------*/

/*------ validation(prism-code for showcode purpose) start ------*/
export const validation1 = `function FormExample() {
    const [validated, setValidated] = useState(false);
  
    const handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
  
      setValidated(true);
    };
  
    return (
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" id="validationCustom01">
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="First name"
              defaultValue="Mark"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" id="validationCustom02">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Last name"
              defaultValue="Otto"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" id="validationCustomUsername">
            <Form.Label>Username</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Username"
                aria-describedby="inputGroupPrepend"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" id="validationCustom03">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="City" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid city.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" id="validationCustom04">
            <Form.Label>State</Form.Label>
            <Form.Control type="text" placeholder="State" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid state.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" id="validationCustom05">
            <Form.Label>Zip</Form.Label>
            <Form.Control type="text" placeholder="Zip" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid zip.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Form.Group className="mb-3">
          <Form.Check
            required
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
            feedbackType="invalid"
          />
        </Form.Group>
        <Button type="submit">Submit form</Button>
      </Form>
    );
  }
  
  export default FormExample;`;

export const validation2 = `<Form className="row g-3">
<Col md={4}>
    <Form.Label htmlFor="validationDefault01">First name</Form.Label>
    <Form.Control type="text" id="validationDefault01"
        defaultValue="Mark" required/>
</Col>
<Col md={4}>
    <Form.Label htmlFor="validationDefault02">Last name</Form.Label>
    <Form.Control type="text" id="validationDefault02"
        defaultValue="Otto" required/>
</Col>
<Col md={4}>
    <Form.Label htmlFor="validationDefaultUsername">Username</Form.Label>
    <InputGroup>
        <InputGroup.Text className="" id="inputGroupPrepend2">@</InputGroup.Text>
        <Form.Control type="text" id="validationDefaultUsername"
            aria-describedby="inputGroupPrepend2" required/>
    </InputGroup>
</Col>
<Col md={6}>
    <Form.Label htmlFor="validationDefault03">City</Form.Label>
    <Form.Control type="text" id="validationDefault03" required/>
</Col>
<Col md={3}>
    <Form.Label htmlFor="validationDefault04">State</Form.Label>
    <Form.Select className="" id="validationDefault04" required defaultValue="Choose...">
        <option disabled >Choose...</option>
        <option>...</option>
    </Form.Select>
</Col>
<Col md={3}>
    <Form.Label htmlFor="validationDefault05">Zip</Form.Label>
    <Form.Control type="text" id="validationDefault05" required/>
</Col>
<div className="col-12">
    <Form.Check type="checkbox" label="Agree to terms and conditions" required />
</div>
<div className="col-12">
    <Button variant='primary' className="btn " type="submit">Submit form</Button>
</div>
</Form>`;

export const validation3 = `<Form className="row g-3">
<Col md={4}>
    <Form.Label htmlFor="validationServer01">First
        name</Form.Label>
    <Form.Control type="text" className="form-control is-valid"
        id="validationServer01" defaultValue="Mark" required/>
    <Form.Control.Feedback>
        Looks good!
    </Form.Control.Feedback>
</Col>
<Col md={4}>
    <Form.Label htmlFor="validationServer02">Last
        name</Form.Label>
    <Form.Control type="text" className="form-control is-valid"
        id="validationServer02" defaultValue="Otto" required/>
    <Form.Control.Feedback>
        Looks good!
    </Form.Control.Feedback>
</Col>
<Col md={4}>
    <Form.Label htmlFor="validationServerUsername"
    >Username</Form.Label>
    <InputGroup className="has-validation">
        <InputGroup.Text className="input-group-text" id="inputGroupPrepend3">@</InputGroup.Text>
        <Form.Control type="text" className="form-control is-invalid"
            id="validationServerUsername"
            aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback"
            required/>
        <Form.Control.Feedback id="validationServerUsernameFeedback"
            className="invalid-feedback">
            Please choose a username.
        </Form.Control.Feedback>
    </InputGroup>
</Col>
<Col md={6}>
    <Form.Label htmlFor="validationServer03">City</Form.Label>
    <Form.Control type="text" className="form-control is-invalid"
        id="validationServer03"
        aria-describedby="validationServer03Feedback" required/>
    <Form.Control.Feedback id="validationServer03Feedback" className="invalid-feedback">
        Please provide a valid city.
    </Form.Control.Feedback>
</Col>
<Col md={3}>
    <Form.Label htmlFor="validationServer04">State</Form.Label>
    <Form.Select className="form-select is-invalid" id="validationServer04" defaultValue="Choose..."
        aria-describedby="validationServer04Feedback" required>
        <option  disabled >Choose...</option>
        <option>...</option>
    </Form.Select>
    <Form.Control.Feedback id="validationServer04Feedback" className="invalid-feedback">
        Please select a valid state.
    </Form.Control.Feedback>
</Col>
<Col md={3}>
    <Form.Label htmlFor="validationServer05">Zip</Form.Label>
    <Form.Control type="text" className="form-control is-invalid"
        id="validationServer05"
        aria-describedby="validationServer05Feedback" required/>
    <Form.Control.Feedback id="validationServer05Feedback" className="invalid-feedback">
        Please provide a valid zip.
    </Form.Control.Feedback>
</Col>
<div className="col-12">
    <Form.Check required isInvalid label="Agree to terms and conditions"
     feedback="You must agree before submitting." feedbackType="invalid" />
</div>
<div className="col-12">
    <Button className="btn btn-primary" type="submit">Submit
        form</Button>
</div>
</Form>`;

export const validation4 = ` function FormExample() {
    const { Formik } = formik;
  
    const schema = yup.object().shape({
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      username: yup.string().required(),
      city: yup.string().required(),
      state: yup.string().required(),
      zip: yup.string().required(),
      file: yup.mixed().required(),
      terms: yup.bool().required().oneOf([true], 'terms must be accepted'),
    });
  
    return (
      <Formik
        validationSchema={schema}
        onSubmit={console.log}
        initialValues={{
          firstName: 'Mark',
          lastName: 'Otto',
          username: '',
          city: '',
          state: '',
          zip: '',
          file: null,
          terms: false,
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group
                as={Col}
                md="4"
                controlId="validationFormik101"
                className="position-relative"
              >
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  isValid={touched.firstName && !errors.firstName}
                />
                <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                as={Col}
                md="4"
                controlId="validationFormik102"
                className="position-relative"
              >
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  isValid={touched.lastName && !errors.lastName}
                />
  
                <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationFormikUsername2">
                <Form.Label>Username</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    aria-describedby="inputGroupPrepend"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    isInvalid={!!errors.username}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.username}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group
                as={Col}
                md="6"
                controlId="validationFormik103"
                className="position-relative"
              >
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="City"
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  isInvalid={!!errors.city}
                />
  
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.city}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                as={Col}
                md="3"
                controlId="validationFormik104"
                className="position-relative"
              >
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="State"
                  name="state"
                  value={values.state}
                  onChange={handleChange}
                  isInvalid={!!errors.state}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.state}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                as={Col}
                md="3"
                controlId="validationFormik105"
                className="position-relative"
              >
                <Form.Label>Zip</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Zip"
                  name="zip"
                  value={values.zip}
                  onChange={handleChange}
                  isInvalid={!!errors.zip}
                />
  
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.zip}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Button type="submit">Submit form</Button>
          </Form>
        )}
      </Formik>
    );
  }
  
  export default FormExample;`;

export const validation5 = `<Form className="was-validated">
<div className="mb-3">
    <Form.Label htmlFor="validationTextarea">Textarea</Form.Label>
    <Form.Control  as="textarea" isInvalid className="" id="validationTextarea"
        placeholder="Required example textarea" required></Form.Control>
    <Form.Control.Feedback>
        Please enter a message in the textarea.
    </Form.Control.Feedback>
</div>
<Form.Check type="checkbox" className="form-check mb-3"  id="validationFormCheck1"
required isInvalid label="Check this checkbox" feedback="Example invalid feedback text" feedbackType='invalid' />
<Form.Check type="radio" className=""  id="validationFormCheck2" name="radio-stacked"
required isInvalid label="Toggle this radio" />
<Form.Check type="radio" className="form-check mb-3"  
id="validationFormCheck3" name="radio-stacked"
required isInvalid label="Or toggle this other radio" 
feedback="More example invalid feedback textt" feedbackType='invalid' />                                
<Form.Group className="mb-3" >
    <Form.Select className="" required aria-label="select example" isInvalid>
        <option>Open this select menu</option>
        <option defaultValue="1">One</option>
        <option defaultValue="2">Two</option>
        <option defaultValue="3">Three</option>
    </Form.Select>
    <Form.Control.Feedback>Example invalid select feedback</Form.Control.Feedback>
</Form.Group>

<div className="mb-3">
    <Form.Control type="file" aria-label="file example"
        required/>
    <Form.Control.Feedback>Example invalid form file feedback</Form.Control.Feedback>
</div>

<div className="mb-3">
    <Button variant='primary' className="btn " type="submit" disabled>Submit
        form</Button>
</div>
</Form>`;
/*------ validation(prism-code for showcode purpose) end ------*/

