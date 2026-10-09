/*------ alerts(prism-code for showcode purpose) start ------*/
export const alerts1 = `
<Alert variant='warning'  className="alert alert-warning alert-dismissible fade show" role="alert" show={show} 
     onClick={toggleShow}><strong>Holy guacamole!</strong> You should check in on some of those fields below.
<Button variant='' type="button"  className="btn-close" data-bs-dismiss="alert" aria-label="Close">
      <i  className="bi bi-x"></i></Button>
</Alert>`;

export const alerts2 = `{alerts.map((alert:any) => (
    <Alert key={alert.id} variant="success"  className="alert alert-warning alert-dismissible fade show" role="alert">
      <strong>Holy guacamole!</strong> You should check in on some of those fields below.
      <Button variant="" type="button"  className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setAlerts((prevAlerts:any) => prevAlerts.filter((a:any) => a.id !== alert.id))}>
        <i  className="bi bi-x"></i>
      </Button>
    </Alert>
  ))}`;

export const alerts3 = `{Defaultalerts.map((idx, alt1) => (
    <Alert variant={idx.class}  className="alert" role="alert" key={alt1}>
        {idx.text}
    </Alert>
))}`;

export const alerts4 = `{Linkalerts.map((idx)=>(
    <Alert variant={idx.class} role="alert">
       {idx.text1} <Link href="#!"
    className="alert-link">{idx.text2}</Link>{idx.text3}
    </Alert>
))}`;

export const alerts5 = ` {solidalert.map((idx) => (
        <Alert variant={idx.class}  className="alert-dismissible fade show" key={Math.random()}>
            {idx.text}
            <Button variant='' type="button"  className="btn-close" data-bs-dismiss="alert" aria-label="Close"
            onClick={() => handleRemove(idx.id)}><i  className="bi bi-x"></i></Button>
        </Alert>
))}`;

export const alert6 = `{outlinealert.map((idx) => (
        <Alert variant={idx.class}  className="alert-dismissible fade show" key={Math.random()}>
            A simple outline primary alert—check it out!
            <Button variant='' type="button"  className="btn-close"
            onClick={() => handleRemove1(idx.id)} data-bs-dismiss="alert" 
            aria-label="Close"><i  className="bi bi-x"></i></Button>
        </Alert>
))}`;

export const alert7 = `<Alert variant='solid-primary'  className="alert shadow alert-dismissible fade show">
        A simple solid primary alert with normal shadow—check it out!
        <Button variant='' type="button"  className="btn-close" data-bs-dismiss="alert" 
        aria-label="Close"><i  className="bi bi-x"></i></Button>
        </Alert>
        <Alert variant='solid-primary'  className="alert shadow-lg alert-dismissible fade show">
        A simple solid primary alert with large shadow—check it out!
        <Button variant='' type="button"  className="btn-close" data-bs-dismiss="alert" 
        aria-label="Close"><i  className="bi bi-x"></i></Button>
</Alert>`;

export const alert8 = `<Alert variant='primary'  className="alert shadow">A simple primary alert with normal shadow—check it out!</Alert>
<Alert variant='primary'  className="alert shadow-lg">A simple primary alert with large shadow—check it out!</Alert>
<Alert variant='secondary'  className="alert shadow-sm">A simple secondary alert with small shadow—check it out!</Alert>
<Alert variant='secondary'  className="alert shadow">A simple secondary alert with normal shadow—check it out!</Alert>
<Alert variant='secondary'  className="alert shadow-lg">A simple secondary alert with large shadow—check it out!</Alert>`;

export const alert9 = `{roundeddefaultalert.map((idx) => (
    <Alert variant={idx.class}  className="alert rounded-pill alert-dismissible fade show" key={Math.random()}>
        {idx.text}
        <Button variant='' type="button"  className="btn-close" data-bs-dismiss="alert" aria-label="Close"
            onClick={() => handleRemove5(idx.id)}
        ><i  className="bi bi-x"></i></Button>
    </Alert>
))}`;

export const alert10 = `{roundedwithbtnalert.map((idx) => (
    <Alert variant={idx.class}  className="alert rounded-pill alert-dismissible 
    custom-rounded-alerts fade show" key={Math.random()}>
        {idx.text}
        <Button variant='' type="button"  className="btn-close custom-close" 
        data-bs-dismiss="alert" aria-label="Close"
            onClick={() => handleRemove6(idx.id)}>
            <i  className="bi bi-x"></i></Button>
    </Alert>
))}`;

export const alert11 = `<Alert variant='primary'  className="alert d-flex align-items-center" role="alert">
<svg  className="flex-shrink-0 me-2 svg-primary" xmlns="http://www.w3.org/2000/svg" height="1.5rem" viewBox="0 0 24 24" width="1.5rem" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
<div>
    An example alert with an icon
</div>
</Alert>`;

export const alert12 = `<Alert variant='primary'  className="alert alert-dismissible fade show custom-alert-icon shadow-sm" role="alert">
<svg  className="me-2 svg-primary" xmlns="http://www.w3.org/2000/svg" height="1.5rem" viewBox="0 0 24 24" width="1.5rem" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
A customized primary alert with an icon
<Button variant='' type="button"  className="btn-close" data-bs-dismiss="alert" aria-label="Close"><i  className="bi bi-x"></i></Button>
</Alert>`;

export const alert13 = `{imagesalert.map((idx:any)=>(
    <Alert variant={idx.color}  className="alert alert-img alert-dismissible fase show rounded-pill flex-wrap" role="alert" key={Math.random()}>
        <div  className="avatar avatar-sm me-3 avatar-rounded">
            <img src={idx.src1} alt="img"/>
        </div>
        <div>A simple {idx.color} alert with image—check it out!</div>
        <Button variant='' type="button"  className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => handleRemove8(idx.id)}
        ><i  className="bi bi-x"></i></Button>
    </Alert>
))}`;

export const alert14 = `<Alert variant='primary'  className="alert alert-img alert-dismissible fase show flex-wrap" role="alert">
<div  className="avatar avatar-xs me-3">
    <img src={face1} alt="img"/>
</div>
<div>A simple primary alert with image—check it out!</div>
<Button variant='' type="button"  className="btn-close" data-bs-dismiss="alert" aria-label="Close"><i  className="bi bi-x"></i></Button>
</Alert>`;

export const alert15 = `<Col xl={6}>
<Alert variant='secondary'  className="alert  overflow-hidden p-0" role="alert">
    <div  className="p-3 bg-secondary text-fixed-white d-flex justify-content-between">
        <h6  className="aletr-heading mb-0 text-fixed-white">Thank you for reporting this.</h6>
        <Button type="button" variant=''  className="btn-close p-0 text-fixed-white" data-bs-dismiss="alert" aria-label="Close"><i  className="bi bi-x"></i></Button>
    </div>
    <hr  className="my-0"/>
    <div  className="p-3">
        <p  className="mb-0">We appreciate you to let us know the bug in the template and for warning us about future consequences <Link to="#"  className="fw-semibold text-decoration-underline">Visit for support for queries ?</Link></p>
    </div>
</Alert>
</Col>`;
/*------ alerts(prism-code for showcode purpose) end ------*/

/*------ Breadcrumb(prism-code for showcode purpose) start ------*/
export const breadcrumb1 = `<nav aria-label="breadcrumb">
<Breadcrumb>
    <Breadcrumb.Item active aria-current="page">Home</Breadcrumb.Item>
</Breadcrumb>
</nav>
<nav aria-label="breadcrumb">
<Breadcrumb>
    <Breadcrumb.Item href="#!">Home</Breadcrumb.Item>
    <Breadcrumb.Item active aria-current="page">Library</Breadcrumb.Item>
</Breadcrumb>
</nav>
<nav aria-label="breadcrumb"><Breadcrumb  className="mb-0">
    <Breadcrumb.Item href="#!">Home</Breadcrumb.Item>
    <Breadcrumb.Item href="#!">Library</Breadcrumb.Item>
    <Breadcrumb.Item active aria-current="page">Data</Breadcrumb.Item>
</Breadcrumb>
</nav>`;

export const breadcrumb2 = `<nav aria-label="breadcrumb">
 <Breadcrumb  className="breadcrumb-example1">
     <Breadcrumb.Item active aria-current="page">Home</Breadcrumb.Item>
 </Breadcrumb>
 </nav>
 
 <nav aria-label="breadcrumb">
 <Breadcrumb  className="breadcrumb-example1">
     <Breadcrumb.Item href="#!">Home</Breadcrumb.Item>
     <Breadcrumb.Item active aria-current="page">Library</Breadcrumb.Item>
 </Breadcrumb>
 </nav>
 
 <nav aria-label="breadcrumb">
 <Breadcrumb  className="breadcrumb-example1 mb-0">
     <Breadcrumb.Item href="#!">Home</Breadcrumb.Item>
     <Breadcrumb.Item href="#!">Library</Breadcrumb.Item>
     <Breadcrumb.Item active aria-current="page">Data</Breadcrumb.Item>
 </Breadcrumb>
 </nav>`;

export const breadcrumb3 = ` <nav 
  aria-label="breadcrumb">
     <Breadcrumb  className="mb-0">
         <Breadcrumb.Item><a href="#!">Home</a></Breadcrumb.Item>
         <Breadcrumb.Item active  className="active" aria-current="page">Library</Breadcrumb.Item>
     </Breadcrumb>
 </nav>`;

export const breadcrumb4 = ` <nav
 aria-label="breadcrumb"  class='svg-breadcrumb'>
 <Breadcrumb  className=" mb-0">
     <Breadcrumb.Item href="#!">Home</Breadcrumb.Item>
     <Breadcrumb.Item active  className="active embedded-breadcrumb" aria-current="page">Library</Breadcrumb.Item>
 </Breadcrumb>
</nav>`;

export const breadcrumb5 = ` <nav aria-label="breadcrumb">
<Breadcrumb  className="breadcrumb breadcrumb-style1 mb-0">
    <Breadcrumb.Item href="#!">Home</Breadcrumb.Item>
    <Breadcrumb.Item href="#!">Library</Breadcrumb.Item>
    <Breadcrumb.Item active  className="active" aria-current="page">Data</Breadcrumb.Item>
</Breadcrumb>
</nav>`;

export const breadcrumb6 = `<nav aria-label="breadcrumb">
<Breadcrumb  className="breadcrumb breadcrumb-style2 mb-0">
    <Breadcrumb.Item href="#!"><i  className="ti ti-home-2 me-1 fs-15 d-inline-block"></i>Home</Breadcrumb.Item>
    <Breadcrumb.Item href="#!"><i  className="ti ti-apps me-1 fs-15 d-inline-block"></i>About</Breadcrumb.Item>
    <Breadcrumb.Item active  className="active" aria-current="page">Services</Breadcrumb.Item>
</Breadcrumb>
</nav>`;

export const breadcrumb7 = `<nav aria-label="breadcrumb"  className="bg-bredcrumb">
<Breadcrumb  className="breadcrumb mb-0">
    <Breadcrumb.Item href="#!">Home</Breadcrumb.Item>
    <Breadcrumb.Item active  className="active" aria-current="page">Library</Breadcrumb.Item>
</Breadcrumb>
</nav>`;
/*------ Breadcrumb(prism-code for showcode purpose) end ------*/

/*------ Buttongroup(prism-code for showcode purpose) start ------*/
export const btngroup1 = `<ButtonGroup  className="btn-group" role="group" aria-label="Basic example">
<Button variant="info" type="button"  className="btn btn-wave"><i  className="bi bi-skip-backward"></i></Button>
<Button variant="info" type="button"  className="btn btn-wave"><i  className="bi bi-pause"></i></Button>
<Button variant="info" type="button"  className="btn btn-wave"><i  className="bi bi-skip-forward"></i></Button>
</ButtonGroup>`;

export const btngroup2 = `<ButtonGroup  className="btn-group">
<Button variant='primary' active href="#"  className="btn  active btn-wave" aria-current="page">Active
    link</Button>
<Button variant='primary' href="#"  className="btn">Link</Button>
<Button variant='primary' href="#"  className="btn ">Link</Button>
</ButtonGroup>`;

export const btngroup3 = ` <ButtonGroup  className="btn-group" role="group" aria-label="Basic mixed styles example">
<Button variant="danger" type="button"  className="btn btn-wave">Left</Button>
<Button variant="warning" type="button"  className="btn btn-wave">Middle</Button>
<Button variant="success" type="button"  className="btn btn-wave">Right</Button>
</ButtonGroup>`;

export const btngroup4 = ` <ButtonGroup  className="btn-group1" role="group" aria-label="Basic outlined example">
<Button variant="outline-primary" type="button"  className="btn btn-wave">Left</Button>
<Button variant="outline-primary" type="button"  className="btn btn-wave">Middle</Button>
<Button variant="outline-primary" type="button"  className="btn btn-wave">Right</Button>
</ButtonGroup>`;

export const btngroup5 = `<ButtonGroup  className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
<input type="checkbox"  className="btn-check" id="btncheck1" />
<label  className="btn btn-outline-primary" htmlFor="btncheck1">Checkbox 1</label>

<input type="checkbox"  className="btn-check" id="btncheck2" />
<label  className="btn btn-outline-primary" htmlFor="btncheck2">Checkbox 2</label>

<input type="checkbox"  className="btn-check" id="btncheck3" />
<label  className="btn btn-outline-primary" htmlFor="btncheck3">Checkbox 3</label>
</ButtonGroup>`;

export const btngroup6 = ` <ButtonGroup  className="btn-group" role="group" aria-label="Basic radio toggle button group">
<input type="radio"  className="btn-check" name="btnradio" id="btnradio1"
    defaultChecked />
<label  className="btn btn-outline-primary" htmlFor="btnradio1">Radio 1</label>

<input type="radio"  className="btn-check" name="btnradio" id="btnradio2"
/>
<label  className="btn btn-outline-primary" htmlFor="btnradio2">Radio 2</label>

<input type="radio"  className="btn-check" name="btnradio" id="btnradio3"
/>
<label  className="btn btn-outline-primary" htmlFor="btnradio3">Radio 3</label>
</ButtonGroup>`;

export const btngroup7 = ` <ButtonGroup  className="btn-group btn-group-lg my-1 me-1" role="group" aria-label="Large button group">
<Button variant="outline-success" type="button"  className="btn">Left</Button>
<Button variant="outline-success" type="button"  className="btn">Middle</Button>
<Button variant="outline-success" type="button"  className="btn">Right</Button>
</ButtonGroup>
<ButtonGroup  className="btn-group my-1 me-1" role="group" aria-label="Default button group">
<Button variant="outline-success" type="button"  className="btn">Left</Button>
<Button variant="outline-success" type="button"  className="btn">Middle</Button>
<Button variant="outline-success" type="button"  className="btn">Right</Button>
</ButtonGroup>
<ButtonGroup  className="btn-group btn-group-sm my-1 me-1" role="group" aria-label="Small button group">
<Button variant="outline-success" type="button"  className="btn">Left</Button>
<Button variant="outline-success" type="button"  className="btn">Middle</Button>
<Button variant="outline-success" type="button"  className="btn">Right</Button>
</ButtonGroup>`;

export const btngroup8 = ` <ButtonToolbar  className="mb-4" role="toolbar"
aria-label="Toolbar with button groups">
<ButtonGroup  className="btn-group me-2 my-1" role="group" aria-label="First group">
    <Button variant="primary" type="button"  className="btn">1</Button>
    <Button variant="primary" type="button"  className="btn">2</Button>
    <Button variant="primary" type="button"  className="btn">3</Button>
    <Button variant="primary" type="button"  className="btn">4</Button>
</ButtonGroup>
<ButtonGroup  className="btn-group me-2 my-1" role="group" aria-label="Second group">
    <Button variant="secondary" type="button"  className="btn">5</Button>
    <Button variant="secondary" type="button"  className="btn">6</Button>
    <Button variant="secondary" type="button"  className="btn">7</Button>
</ButtonGroup>
<ButtonGroup  className="btn-group my-1" role="group" aria-label="Third group">
    <Button variant="info" type="button"  className="btn btn-info">8</Button>
</ButtonGroup>
</ButtonToolbar>
<ButtonToolbar  className="mb-3" role="toolbar"
aria-label="Toolbar with button groups">
<ButtonGroup  className="btn-group me-2 my-1" role="group" aria-label="First group">
    <Button variant="outline-secondary" type="button"  className="btn">1</Button>
    <Button variant="outline-secondary" type="button"  className="btn">2</Button>
    <Button variant="outline-secondary" type="button"  className="btn">3</Button>
    <Button variant="outline-secondary" type="button"  className="btn">4</Button>
</ButtonGroup>
<InputGroup>
    <InputGroup.Text id="btnGroupAddon">@</InputGroup.Text>
    <Form.Control type="text"
        placeholder="Input group example"
        aria-label="Input group example"
        aria-describedby="btnGroupAddon" />
</InputGroup>
</ButtonToolbar>
<ButtonToolbar  className="justify-content-between" role="toolbar"
aria-label="Toolbar with button groups">
<ButtonGroup  className="btn-group my-1" role="group" aria-label="First group">
    <Button variant="outline-secondary" type="button"  className="btn">1</Button>
    <Button variant="outline-secondary" type="button"  className="btn">2</Button>
    <Button variant="outline-secondary" type="button"  className="btn">3</Button>
    <Button variant="outline-secondary" type="button"  className="btn">4</Button>
</ButtonGroup>
<InputGroup>
    <InputGroup.Text id="btnGroupAddon2">@</InputGroup.Text>
    <Form.Control type="text"
        placeholder="Input group example"
        aria-label="Input group example"
        aria-describedby="btnGroupAddon2" />
</InputGroup>
</ButtonToolbar>`;

export const btngroup9 = `<ButtonGroup  className="btn-group" role="group"
aria-label="Button group with nested dropdown">
<Button variant="" type="button"  className="btn btn-primary">1</Button>
<Button variant="" type="button"  className="btn btn-primary">2</Button>

<DropdownButton as={ButtonGroup} title="Dropdown" id="bg-nested-dropdown">
    <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
    <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
</DropdownButton>
</ButtonGroup>`;

export const btngroup10 = `<ButtonGroup vertical role="group" aria-label="Vertical button group">
<Button variant="primary" type="button"  className="btn ">Button</Button>
<Button variant="primary" type="button"  className="btn ">Button</Button>
<DropdownButton as={ButtonGroup} title="Dropdown" id="bg-vertical-dropdown-1">
    <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
    <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
</DropdownButton>
<Button variant="primary" type="button"  className="btn ">Button</Button>
<Button variant="primary" type="button"  className="btn ">Button</Button>
<DropdownButton as={ButtonGroup} title="Dropdown" id="bg-vertical-dropdown-1">
     <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
     <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
     </DropdownButton>
  <DropdownButton as={ButtonGroup} title="Dropdown" id="bg-vertical-dropdown-1">
     <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
     <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
     </DropdownButton>
  <DropdownButton as={ButtonGroup} title="Dropdown" id="bg-vertical-dropdown-1">
     <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
     <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
     </DropdownButton>
</ButtonGroup>
</Col>
<Col sm={3}>
<ButtonGroup vertical role="group" aria-label="Vertical button group">
 <Button variant="" type="button"  className="btn btn-info">Button</Button>
 <Button variant="" type="button"  className="btn btn-info">Button</Button>
 <Button variant="" type="button"  className="btn btn-info">Button</Button>
 <Button variant="" type="button"  className="btn btn-info">Button</Button>
 <Button variant="" type="button"  className="btn btn-info">Button</Button>
 <Button variant="" type="button"  className="btn btn-info">Button</Button>
</ButtonGroup>
</Col>
<Col sm={3}>
<ButtonGroup vertical role="group"
 aria-label="Vertical radio toggle button group">
 <input type="radio"  className="btn-check" name="vbtn-radio" id="vbtn-radio1"
     defaultChecked/>
 <Button variant='outline-danger'  className="btn btn-outline-danger" htmlFor="vbtn-radio1">Radio 1</Button>
 <input type="radio"  className="btn-check" name="vbtn-radio" id="vbtn-radio2"
    />
 <Button variant='outline-danger'  className="btn btn-outline-danger" htmlFor="vbtn-radio2">Radio 2</Button>
 <input type="radio"  className="btn-check" name="vbtn-radio" id="vbtn-radio3"
    />
 <Button variant='outline-danger'  className="btn btn-outline-danger" htmlFor="vbtn-radio3">Radio 3</Button>
</ButtonGroup>
</Col>`;

export const btngroup11 = `<ButtonGroup  className="btn-group" role="group" aria-label="Basic example"> 
<Button variant=""  className="btn btn-icon btn-facebook btn-wave">
<i  className="ri-facebook-line"></i>
</Button>
<Button variant=""  className="btn btn-icon btn-twitter btn-wave">
    <i  className="ri-twitter-line"></i>
</Button>
<Button variant=""  className="btn btn-icon btn-instagram btn-wave">
    <i  className="ri-instagram-line"></i>
</Button>
<Button variant=""  className="btn btn-icon btn-github btn-wave">
    <i  className="ri-github-line"></i>
</Button>
<Button variant=""  className="btn btn-icon btn-youtube btn-wave">
    <i  className="ri-youtube-line"></i>
</Button>
<Button variant=""  className="btn btn-icon btn-google btn-wave">
    <i  className="ri-google-line"></i>
</Button>
   </ButtonGroup>`;
/*------ Buttongroup(prism-code for showcode purpose) end ------*/

/*------ Buttons(prism-code for showcode purpose) start ------*/
export const button1 = `{DefaultButtons.map((idx) => (
    <Button variant={idx.class} type="button"  className="btn-wave waves-effect waves-light me-2"
     key={Math.random()}>{idx.text}</Button>
))}`;

export const button2 = `{DefaultButtons.map((idx) => (
    <Button variant={idx.class} type="button"  className="rounded-pill btn-wave me-2" key={Math.random()}>{idx.text}</Button>
))}`;

export const button3 = `{LightButtons.map((idx) => (
    <Button type="button" variant={idx.class}  className="btn btn-wave me-2" 
    key={Math.random()}>{idx.text}</Button>
))}`;

export const button4 = ` {LightButtons.map((idx) => (
    <Button type="button" variant={idx.class}  className="btn rounded-pill btn-wave me-2" 
    key={Math.random()}>{idx.text}</Button>
))}`;

export const button5 = `  {OutlineButtons.map((idx) => (
    <Button type="button" variant={idx.class}  className="btn btn-wave me-2" 
    key={Math.random()}>{idx.text}</Button>
))}`;

export const button6 = ` {OutlineButtons.map((idx) => (
    <Button type="button" variant={idx.class}  className="btn rounded-pill btn-wave me-2"
     key={Math.random()}>{idx.text}</Button>
))}`;

export const button7 = `  {GradientButtons.map((idx) => (
    <Button type="button" variant={idx.class}  className="btn btn-wave me-2" 
    key={Math.random()}>{idx.text}</Button>
))}`;

export const button8 = `{GradientButtons.map((idx) => (
    <Button type="button" variant={idx.class}  className="btn rounded-pill btn-wave me-2"
     key={Math.random()}>{idx.text}</Button>
))}`;

export const button9 = `<div  className="btn-list">
<div  className="mb-4">
    <Button type="button" variant='primary'  className="btn" disabled>Primary
        button</Button>
    <Button type="button" variant='secondary'  className="btn" disabled>Button</Button>
    <Button type="button" variant='outline-primary'  className="btn b" disabled>Primary
        button</Button>
    <Button type="button" variant='outline-secondary'  className="btn " disabled>Button</Button>
</div>

<div>
    <Button variant='primary'disabled  className="btn" role="button">Primary
        link</Button>
    <Button variant='secondary' disabled  className="btn" role="button">Link</Button>
</div>
</div>`;

export const button10 = ` <div  className="btn-list">
<div  className="mb-4">
    <Button type="button" variant='primary'  className="btn btn-wave"
    >Toggle button</Button>
    <Button type="button" variant='secondary' active  className="btn  btn-wave">
        Active toggle button</Button>
    <Button type="button" variant='teal'  className="btn btn-wave" disabled>Disabled toggle
        button</Button>
</div>
<div>
    <Button variant='primary' href="#!"  className="btn btn-wave" role="button" >Toggle
        link</Button>
    <Button href="#!" variant='secondary' active  className="btn btn-wave" role="button">
        Active toggle link</Button>
    <Button variant='teal'  className="btn  btn-wave" role="button" disabled>Disabled toggle link</Button>
</div>
</div>`;

export const button11 = ` <div  className="btn-list d-md-flex flex-wrap">
<Button variant='primary'  className="btn  btn-loader">
    <span  className="me-2">Loading</span>
    <span  className="loading"><i  className="ri-loader-2-fill fs-16"></i></span>
</Button>
<Button variant='outline-secondary'  className="btn btn-loader">
    <span  className="me-2">Loading</span>
    <span  className="loading"><i  className="ri-loader-2-fill fs-16"></i></span>
</Button>
<Button variant='info-transparent'  className="btn  btn-loader">
    <span  className="me-2">Loading</span>
    <span  className="loading"><i  className="ri-loader-4-line fs-16"></i></span>
</Button>
<Button variant='warning-transparent'  className="btn  btn-loader">
    <span  className="me-2">Loading</span>
    <span  className="loading"><i  className="ri-loader-5-line fs-16"></i></span>
</Button>
<Button variant='success'  className="btn btn-loader" disabled>
    <span  className="me-2">Disabled</span>
    <span  className="loading"><i  className="ri-refresh-line fs-16"></i></span>
</Button>
</div>`;

export const button12 = `<div  className="btn-list d-md-flex d-block">
<div  className="mb-md-0 mb-2">
    <Button variant="primary"  className="btn btn-icon  btn-wave">
        <i  className="ri-bank-fill"></i>
    </Button>
    <Button variant="info"  className="btn btn-icon  btn-wave">
        <i  className="ri-medal-line"></i>
    </Button>
    <Button variant="danger"  className="btn btn-icon  btn-wave">
        <i  className="ri-archive-line"></i>
    </Button>
    <Button variant="warning"  className="btn btn-icon  btn-wave me-5">
        <i  className="ri-calendar-2-line"></i>
    </Button>
</div>
<div  className="mb-md-0 mb-2">
    <Button variant="primary-transparent"  className="btn btn-icon rounded-pill btn-wave">
        <i  className="ri-home-smile-line"></i>
    </Button>
    <Button variant="secondary-transparent"  className="btn btn-icon  rounded-pill btn-wave">
        <i  className="ri-delete-bin-line"></i>
    </Button>
    <Button variant="success-transparent"  className="btn btn-icon  rounded-pill btn-wave">
        <i  className="ri-notification-3-line"></i>
    </Button>
    <Button variant="danger-transparent"  className="btn btn-icon  rounded-pill btn-wave me-5">
        <i  className="ri-chat-settings-line"></i>
    </Button>
</div>
<div  className="">
    <Button variant="outline-primary"  className="btn btn-icon  rounded-pill btn-wave">
        <i  className="ri-phone-line"></i>
    </Button>
    <Button variant="outline-teal"  className="btn btn-icon  rounded-pill btn-wave">
        <i  className="ri-customer-service-2-line"></i>
    </Button>
    <Button variant="outline-success"  className="btn btn-icon  rounded-pill btn-wave">
        <i  className="ri-live-line"></i>
    </Button>
    <Button variant="outline-secondary"  className="btn btn-icon  rounded-pill btn-wave">
        <i  className="ri-save-line"></i>
    </Button>
</div>
</div>`;

export const button13 = `{GhostButtons.map((idx) => (
    <Button type="button" variant={idx.class}  className="btn btn-wave me-2" 
    key={Math.random()}>{idx.text}</Button>
))}`;

export const button14 = `<div  className="btn-list">
<Button variant='primary'  className="btn  btn-wave" href="#!" role="button">Link</Button>
<Button variant='secondary'  className="btn  btn-wave" type="submit">Button</Button>
<Button variant='info' as="input"  className="btn " type="button" value="Input" />
<Button variant='warning' as="input"  className="btn" type="submit" value="Submit" />
<Button variant='success' as="input"  className="btn " type="reset" value="Reset" />
</div>`;

export const button15 = ` <div  className="btn-list">
<Button variant='primary' disabled  className="btn" tabIndex={-1} role="button">Primary link</Button>
<Button variant='secondary' disabled  className="btn" tabIndex={-1} role="button">Link</Button>
</div>`;

export const button16 = `<Button  className="btn btn-icon btn-facebook btn-wave waves-effect waves-light">
<i  className="ri-facebook-line"></i>
</Button>
<Button  className="btn btn-icon btn-twitter btn-wave waves-effect waves-light">
 <i  className="ri-twitter-line"></i>
 </Button>
 <Button  className="btn btn-icon btn-instagram btn-wave waves-effect waves-light">
<i  className="ri-instagram-line"></i>
 </Button>
 <Button  className="btn btn-icon btn-github btn-wave waves-effect waves-light">
     <i  className="ri-github-line"></i>
 </Button>
 <Button  className="btn btn-icon btn-youtube btn-wave waves-effect waves-light">
     <i  className="ri-youtube-line"></i>
 </Button>
 <Button  className="btn btn-icon btn-google btn-wave waves-effect waves-light">
     <i  className="ri-google-line"></i>
 </Button>`;

export const button17 = ` <div  className="btn-list">
<Button type="button" variant='primary'  className="btn  btn-sm btn-wave">Small
    button</Button>
<Button type="button" variant='secondary'  className="btn  btn-wave">Default
    button</Button>
<Button type="button" variant='success'  className="btn  btn-lg btn-wave">Large
    button</Button>
</div>`;

export const button18 = `<div  className="btn-list">
<Button type="button" variant='primary'  className="btn btn-w-xs btn-wave">XS</Button>
<Button type="button" variant='secondary'  className="btn btn-w-sm btn-wave">SM</Button>
<Button type="button" variant='warning'  className="btn btn-w-md btn-wave">MD</Button>
<Button type="button" variant='info'  className="btn btn-w-lg btn-wave">LG</Button>
</div>`;

export const button19 = `<div  className="btn-list d-flex">
<div  className="me-5">
    <Button variant='primary'  className="btn  shadow-sm btn-wave">Button</Button>
    <Button variant='primary'  className="btn btn-primary shadow btn-wave">Button</Button>
    <Button variant='primary'  className="btn btn-primary shadow-lg btn-wave">Button</Button>
</div>
<div>
    <Button variant='secondary'  className="btn  btn-sm shadow-sm btn-wave">Button</Button>
    <Button variant='info'  className="btn  shadow btn-wave">Button</Button>
    <Button variant='success'  className="btn btn-lg  shadow-lg btn-wave">Button</Button>
</div>
</div>`;

export const button20 = ` <Button variant='primary'  className="btn shadow-primary btn-wave">Button</Button>
<Button variant='secondary'  className="btn shadow-secondary btn-wave">Button</Button>
<Button variant='success'  className="btn shadow-success btn-wave">Button</Button>
<Button variant='info'  className="btn shadow-info btn-wave">Button</Button>
<Button variant='warning'  className="btn shadow-warning btn-wave">Button</Button>
<Button variant='danger'  className="btn shadow-danger btn-wave">Button</Button>
<Button variant='purple'  className="btn shadow-purple btn-wave">Button</Button>
<Button variant='orange'  className="btn shadow-orange btn-wave">Button</Button>`;

export const button21 = ` {ColoredButtons.map((idx) => (
    <Button variant={idx.class}  className="btn  btn-raised-shadow btn-wave" 
    key={Math.random()}>Button</Button>
))}`;

export const button22 = `<div  className="btn-list">
<Button  className="btn btn-primary label-btn">
    <i  className="ri-chat-smile-line label-btn-icon me-2"></i>
    Primary
</Button>
<Button  className="btn btn-secondary label-btn">
    <i  className="ri-settings-4-line label-btn-icon me-2"></i>
    Secondary
</Button>
<Button  className="btn btn-warning label-btn rounded-pill">
    <i  className="ri-spam-2-line label-btn-icon me-2 rounded-pill"></i>
    Warning
</Button>
<Button  className="btn btn-info label-btn rounded-pill">
    <i  className="ri-phone-line label-btn-icon me-2 rounded-pill"></i>
    Info
</Button>
<Button  className="btn btn-success label-btn label-end">
    Success
    <i  className="ri-thumb-up-line label-btn-icon ms-2"></i>
</Button>
<Button  className="btn btn-danger label-btn label-end rounded-pill">
    Cancel
    <i  className="ri-close-line label-btn-icon ms-2 rounded-pill"></i>
</Button>
</div>`;

export const button23 = `<div  className="btn-list">
<Button variant='info'  className="btn  custom-button rounded-pill">
    <span  className="custom-btn-icons"><i  className="ri-twitter-line text-info"></i></span>
    Twitter
</Button>
<Button variant='teal-light'  className="btn  btn-border-down">Border</Button>
<Button variant='secondary-light'  className="btn  btn-border-start">Border</Button>
<Button variant='purple-light'  className="btn  btn-border-end">Border</Button>
<Button variant='warning-light'  className="btn  btn-border-top">Border</Button>
<Button variant='secondary'  className="btn  btn-glare"><span>Glare Button</span></Button>
<Button variant='danger'  className="btn  btn-hover btn-hover-animate">Like</Button>
<Button variant='success'  className="btn  btn-darken-hover">Hover</Button>
<Button variant='orange'  className="btn  btn-custom-border">Hover</Button>
</div>`;

export const button24 = `<div  className="btn-list">
<div  className="d-grid gap-2 mb-4">
    <Button variant='primary'  className="btn  btn-wave" type="button">Button</Button>
    <Button variant='secondary'  className="btn  btn-wave" type="button">Button</Button>
</div>
<div  className="d-grid gap-2 d-md-block">
    <Button variant='info'  className="btn  btn-wave" type="button">Button</Button>
    <Button variant='success'  className="btn  btn-wave" type="button">Button</Button>
</div>
<div  className="d-grid gap-2 col-6 mx-auto">
    <Button variant='danger'  className="btn  btn-wave" type="button">Button</Button>
    <Button variant='warning'  className="btn  btn-wave" type="button">Button</Button>
</div>
<div  className="d-grid gap-2 d-md-flex justify-content-md-end">
    <Button variant='teal'  className="btn me-md-2 btn-wave" type="button">Button</Button>
    <Button variant='purple'  className="btn  btn-wave" type="button">Button</Button>
</div>
</div>`;
/*------ Buttons(prism-code for showcode purpose) end ------*/

/*------ Badge(prism-code for showcode purpose) start ------*/
export const badge1 = `<Badge bg="primary">Primary</Badge>
<Badge bg="secondary">Secondary</Badge>
<Badge bg="success">Success</Badge>
<Badge bg="danger">Danger</Badge>
<Badge bg="warning">Warning</Badge>
<Badge bg="info">Info</Badge>
<Badge bg="light">Light</Badge>
<Badge bg="dark">Dark</Badge>`;

export const badge2 = `<Badge bg="primary"  className="rounded-pill">Primary</Badge>
<Badge bg="secondary"  className="rounded-pill">Secondary</Badge>
<Badge bg="success"  className="rounded-pill">Success</Badge>
<Badge bg="danger"  className="rounded-pill">Danger</Badge>
<Badge bg="warning"  className="rounded-pill">Warning</Badge>
<Badge bg="info"  className="rounded-pill">Info</Badge>
<Badge bg="light"  className="rounded-pill">Light</Badge>
<Badge bg="dark"  className="rounded-pill">Dark</Badge>`;

export const badge3 = `<Badge bg="primary-transparent">Primary</Badge>
<Badge bg="secondary-transparent">Secondary</Badge>
<Badge bg="success-transparent">Success</Badge>
<Badge bg="danger-transparent">Danger</Badge>
<Badge bg="warning-transparent">Warning</Badge>
<Badge bg="info-transparent">Info</Badge>
<Badge bg="light-transparent">Light</Badge>
<Badge bg="dark-transparent">Dark</Badge>`;

export const badge4 = `<Badge bg="primary-transparent"  className="rounded-pill">Primary</Badge>
<Badge bg="secondary-transparent"  className="rounded-pill">Secondary</Badge>
<Badge bg="success-transparent"  className="rounded-pill">Success</Badge>
<Badge bg="danger-transparent"  className="rounded-pill">Danger</Badge>
<Badge bg="warning-transparent"  className="rounded-pill">Warning</Badge>
<Badge bg="info-transparent"  className="rounded-pill">Info</Badge>
<Badge bg="light-transparent"  className="rounded-pill">Light</Badge>
<Badge bg="dark-transparent"  className="rounded-pill">Dark</Badge>`;

export const badge5 = `<Badge bg="outline-primary">Primary</Badge>
<Badge bg="outline-secondary">Secondary</Badge>
<Badge bg="outline-success">Success</Badge>
<Badge bg="outline-danger">Danger</Badge>
<Badge bg="outline-warning">Warning</Badge>
<Badge bg="outline-info">Info</Badge>
<Badge bg="outline-light"  className="text-dark">Light</Badge>
<Badge bg="outline-dark">Dark</Badge>`;

export const badge6 = `<Badge  className="rounded-pill" bg="outline-primary">Primary</Badge>
<Badge  className="rounded-pill" bg="outline-secondary">Secondary</Badge>
<Badge  className="rounded-pill" bg="outline-success">Success</Badge>
<Badge  className="rounded-pill" bg="outline-danger">Danger</Badge>
<Badge  className="rounded-pill" bg="outline-warning">Warning</Badge>
<Badge  className="rounded-pill" bg="outline-info">Info</Badge>
<Badge  className="rounded-pill" bg="outline-light"  className="text-dark">Light</Badge>
<Badge  className="rounded-pill"  bg="outline-dark">Dark</Badge>`;

export const badge7 = `<Badge bg="primary-gradient">Primary</Badge>
<Badge bg="secondary-gradient">Secondary</Badge>
<Badge bg="success-gradient">Success</Badge>
<Badge bg="danger-gradient">Danger</Badge>
<Badge bg="warning-gradient">Warning</Badge>
<Badge bg="info-gradient">Info</Badge>
<Badge bg="orange-gradient">Light</Badge>
<Badge bg="purple-gradient">Dark</Badge>`;

export const badge8 = `<Badge bg="primary-gradient"  className="rounded-pill">Primary</Badge>
<Badge bg="secondary-gradient"  className="rounded-pill">Secondary</Badge>
<Badge bg="success-gradient"  className="rounded-pill">Success</Badge>
<Badge bg="danger-gradient"  className="rounded-pill">Danger</Badge>
<Badge bg="warning-gradient"  className="rounded-pill">Warning</Badge>
<Badge bg="info-gradient"  className="rounded-pill">Info</Badge>
<Badge bg="orange-gradient"  className="rounded-pill">Light</Badge>
<Badge bg="purple-gradient"  className="rounded-pill">Dark</Badge>`;

export const badge9 = `<Button  variant='danger' type="button"  className="my-1 me-2">
Notifications <Badge bg="white"  className=" ms-2 text-danger">777</Badge>
</Button>
<Button  variant='primary' type="button"  className="my-1 me-2">
Notifications <Badge bg="white"  className=" ms-2 text-primary">4</Badge>
</Button>
<Button  variant='info' type="button"  className="my-1 me-2">
Notifications <Badge bg="white"  className=" ms-2 text-info">32</Badge>
</Button>
<Button  variant='warning' type="button"  className="my-1 me-2">
Notifications <Badge bg="white"  className=" ms-2 text-warning">7</Badge>
</Button>
<Button  variant='success' type="button"  className="my-1 me-2">
Notifications <Badge bg="white"  className=" ms-2 text-success">12</Badge>
</Button>
<Button  variant='secondary' type="button"  className="my-1 me-2">
Notifications <Badge bg="white"  className=" ms-2 text-secondary">7</Badge>
</Button>`;

export const badge10 = ` <Button variant='primary' type="button"  className=" my-1 me-2">
Notifications <Badge bg="secondary"  className="ms-2 ">4</Badge>
</Button>
<Button variant='secondary' type="button"  className=" my-1 me-2">
Notifications <Badge bg="primary"  className="ms-2 ">7</Badge>
</Button>
<Button variant='success' type="button"  className=" my-1 me-2">
Notifications <Badge bg="danger"  className="ms-2 ">12</Badge>
</Button>
<Button variant='info' type="button"  className=" my-1 me-2">
Notifications <Badge bg="warning"  className="ms-2 ">32</Badge>
</Button>`;

export const badge11 = `<Button variant='outline-primary' type="button"  className="btn  my-1 me-2">
Notifications <Badge bg=""  className="badge ms-2">4</Badge>
</Button>
<Button variant='outline-secondary' type="button"  className="btn  my-1 me-2">
Notifications <Badge bg=""  className="badge ms-2">7</Badge>
</Button>
<Button variant='outline-success' type="button"  className="btn  my-1 me-2">
Notifications <Badge bg=""  className="badge ms-2">12</Badge>
</Button>
<Button variant='outline-info' type="button"  className="btn  my-1 me-2">
Notifications <Badge bg=""  className="badge ms-2">32</Badge>
</Button>`;

export const badge12 = `<h1>Example heading <Badge bg="primary"  className="badge">New</Badge></h1>
<h2>Example heading <Badge bg="primary"  className="badge">New</Badge></h2>
<h3>Example heading <Badge bg="primary"  className="badge">New</Badge></h3>
<h4>Example heading <Badge bg="primary"  className="badge">New</Badge></h4>
<h5>Example heading <Badge bg="primary"  className="badge">New</Badge></h5>
<h6>Example heading <Badge bg="primary"  className="badge">New</Badge></h6>`;

export const badge13 = `<div  className="d-flex flex-wrap gap-4">
<button type="button"  className="btn btn-primary position-relative">
Inbox
    <span
         className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
99+
        <span  className="visually-hidden">unread messages</span>
    </span>
</button>
<button type="button"  className="btn btn-secondary position-relative">
Profile
    <span
         className="position-absolute top-0 start-100 translate-middle p-2 bg-success border border-light rounded-circle">
        <span  className="visually-hidden">New alerts</span>
    </span>
</button>
<span  className="avatar">
    <img src="../../../assets/images/faces/2.jpg" alt="img" />
    <span
         className="position-absolute top-0 start-100 translate-middle p-1 bg-success border border-light rounded-circle">
        <span  className="visually-hidden">New alerts</span>
    </span>
</span>
<span  className="avatar avatar-rounded">
    <img src="../../../assets/images/faces/15.jpg" alt="img" />
    <span  className="position-absolute top-0 start-100 translate-middle p-1 bg-success border border-light              rounded-circle">
        <span  className="visually-hidden">New alerts</span>
    </span>
</span>
<span  className="avatar avatar-rounded">
    <img src="../../../assets/images/faces/10.jpg" alt="img" />
    <span  className="position-absolute top-0 start-100 translate-middle badge bg-secondary rounded-pill shadow-lg">1000+
        <span  className="visually-hidden">New alerts</span>
    </span>
</span>
</div>`;

export const badge14 = `<p  className="mb-xxl-0 badge bg-outline-info custom-badge fs-15 me-5">
<i  className="ti ti-home me-1 d-inline-flex"></i>Home</p>
<p  className="mb-xxl-0 badge bg-success custom-badge fs-15 me-5">
<i  className="ti ti-home me-1 d-inline-flex"></i>Home</p>
<p  className="mb-xxl-0 icon-badge me-5">
<svg  className="icon" xmlns="http://www.w3.org/2000/svg" height="24px"
 viewBox="0 0 24 24" width="24px" fill="#000000">
 <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.
 5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>
<span  className="badge rounded-pill bg-success">14</span>
</p>
<p  className="mb-xxl-0 badge border bg-light text-default custom-badge me-5"><i  className="fe fe-eye me-1 d-inline-flex"></i>13.2k</p>
<p  className="mb-xxl-0 text-badge me-5">
<span  className="text fs-18">Inbox</span>
<Badge  className="badge rounded-pill bg-success">32</Badge>
</p>`;
/*------ Badge(prism-code for showcode purpose) end ------*/

/*------ Dropdowns(prism-code for showcode purpose) start ------*/
export const dropdown1 = `<Dropdown  className="dropdown">
 <Dropdown.Toggle variant=''  className="btn btn-primary dropdown-toggle" type="button"
     id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
     Dropdown button
 </Dropdown.Toggle>
 <Dropdown.Menu as="ul"  className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
     <Dropdown.Item as="li" href="#!">Action</Dropdown.Item>
     <Dropdown.Item as="li" href="#!">Another action</Dropdown.Item>
     <Dropdown.Item as="li" href="#!">Something else here</Dropdown.Item>
 </Dropdown.Menu>
</Dropdown>
<Dropdown  className="dropdown">
 <Dropdown.Toggle  className="btn btn-secondary dropdown-toggle" href="#!" role="button"
     id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
     Dropdown link
 </Dropdown.Toggle>
 <Dropdown.Menu as="ul"  className="dropdown-menu" aria-labelledby="dropdownMenuLink">
     <Dropdown.Item as="li" href="#!">Action</Dropdown.Item>
     <Dropdown.Item as="li" href="#!">Another action</Dropdown.Item>
     <Dropdown.Item as="li" href="#!">Something else here</Dropdown.Item>
 </Dropdown.Menu>
</Dropdown>`;

export const dropdown2 = `{SingleButtons.map((idx) => (
    <div  className="btn-group" key={Math.random()}>
        <Dropdown>
            <Dropdown.Toggle type="button" variant={idx.class}  className="btn"
                data-bs-toggle="dropdown" aria-expanded="false">
                Action
            </Dropdown.Toggle>
            <Dropdown.Menu as="ul">
                <Dropdown.Item as="li" href="#!">Action</Dropdown.Item>
                <Dropdown.Item as="li" href="#!">Another action</Dropdown.Item>
                <Dropdown.Item as="li" href="#!">Something else here</Dropdown.Item>
                <li>
                    <hr  className="dropdown-divider" />
                </li>
                <Dropdown.Item as="li" href="#!">Separated link</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    </div>
))}`;

export const dropdown3 = `{SingleButtons.map((idx) => (
    <div  className="btn-group" key={Math.random()}>
        <Dropdown>
            <Dropdown.Toggle variant={idx.class} type="button"  className="btn dropdown-toggle rounded-pill"
                data-bs-toggle="dropdown" aria-expanded="false">
                Action
            </Dropdown.Toggle>
            <Dropdown.Menu as="ul">
                <Dropdown.Item as="li" href="#!">Action</Dropdown.Item>
                <Dropdown.Item as="li" href="#!">Another action</Dropdown.Item>
                <Dropdown.Item as="li" href="#!">Something else here</Dropdown.Item>
                <li>
                    <hr  className="dropdown-divider" />
                </li>
                <Dropdown.Item as="li" href="#!">Separated link</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    </div>
))}`;

export const dropdown4 = `{OutlineButtons.map((idx) => (
    <div  className="btn-group" key={Math.random()}>
        <Dropdown>
            <Dropdown.Toggle variant={idx.class} type="button"  className="btn  dropdown-toggle"
                data-bs-toggle="dropdown" aria-expanded="false">
                Action
            </Dropdown.Toggle>
            <Dropdown.Menu as="ul">
                <Dropdown.Item as="li" href="#!">Action</Dropdown.Item>
                <Dropdown.Item as="li" href="#!">Another action</Dropdown.Item>
                <Dropdown.Item as="li" href="#!">Something else here</Dropdown.Item>
                <li>
                    <hr  className="dropdown-divider" />
                </li>
                <Dropdown.Item as="li" href="#!">Separated link</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    </div>
))}`;

export const dropdown5 = ` {OutlineButtons.map((idx) => (
    <div  className="btn-group" key={Math.random()}>
        <Dropdown>
            <Dropdown.Toggle variant={idx.class} type="button"  className="btn dropdown-toggle rounded-pill"
                data-bs-toggle="dropdown" aria-expanded="false">
                Action
            </Dropdown.Toggle>
            <Dropdown.Menu as="ul">
                <Dropdown.Item as="li" href="#!">Action</Dropdown.Item>
                <Dropdown.Item as="li" href="#!">Another action</Dropdown.Item>
                <Dropdown.Item as="li" href="#!">Something else here</Dropdown.Item>
                <Dropdown.Divider  className="dropdown-divider" />
                <Dropdown.Item as="li" href="#!">Separated link</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    </div>
))}`;

export const dropdown6 = ` {SplitButtonsdata.map((idx) => (
    <SplitButton key={Math.random()}  class='me-2 my-1'
        variant={idx.class}
        title="Action"
    >
        <Dropdown.Item eventKey="1">Action</Dropdown.Item>
        <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
        <Dropdown.Item eventKey="3" active>
            Active Item
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
    </SplitButton>
))}`;

export const dropdown7 = `<div  className="btn-group my-1 me-2">
 <Dropdown>
     <Dropdown.Toggle variant=''  className="btn btn-primary btn-lg dropdown-toggle" type="button"
         data-bs-toggle="dropdown" aria-expanded="false">
         Large button
     </Dropdown.Toggle>
     <Dropdown.Menu as="ul">
         <Dropdown.Item as="li" href="#!">Action</Dropdown.Item>
         <Dropdown.Item as="li" href="#!">Another action</Dropdown.Item>
         <Dropdown.Item as="li" href="#!">Something else here</Dropdown.Item>
         <Dropdown.Divider  className="dropdown-divider" />
         <Dropdown.Item as="li" href="#!">Separated link</Dropdown.Item>
     </Dropdown.Menu>
 </Dropdown>
</div>
<div  className="btn-group my-1 me-2">
 <Dropdown as={ButtonGroup}>
     <Button variant="light">Large split button</Button>
     <Dropdown.Toggle split variant="light" id="dropdown-split-basic" />
     <Dropdown.Menu>
         <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
         <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
         <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
         <Dropdown.Divider  className="dropdown-divider" />
         <Dropdown.Item as="li" href="#!">Separated link</Dropdown.Item>
     </Dropdown.Menu>
 </Dropdown>
</div>
<div  className="btn-group my-1 me-2">
 <Dropdown>
     <Dropdown.Toggle size="sm" variant=''  className="btn btn-primary dropdown-toggle" type="button"
         data-bs-toggle="dropdown" aria-expanded="false">
         Small button
     </Dropdown.Toggle>
     <Dropdown.Menu as="ul">
         <Dropdown.Item as="li" href="#!">Action</Dropdown.Item>
         <Dropdown.Item as="li" href="#!">Another action</Dropdown.Item>
         <Dropdown.Item as="li" href="#!">Something else here</Dropdown.Item>
         <Dropdown.Divider  className="dropdown-divider" />
         <Dropdown.Item as="li" href="#!">Separated link</Dropdown.Item>
     </Dropdown.Menu>
 </Dropdown>
</div>
<div  className="btn-group my-1 me-2">
 <Dropdown as={ButtonGroup}>
     <Button size='sm' variant="light">Small split button</Button>
     <Dropdown.Toggle split variant="light" id="dropdown-split-basic" />
     <Dropdown.Menu>
         <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
         <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
         <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
         <Dropdown.Divider  className="dropdown-divider" />
         <Dropdown.Item as="li" href="#!">Separated link</Dropdown.Item>
     </Dropdown.Menu>
 </Dropdown>
</div>`;

export const dropdown8 = ` <Dropdown drop="up"  className="btn-group dropup my-1 me-2">
 <Dropdown.Toggle variant='' type="button"  className="btn btn-primary dropdown-toggle"
     data-bs-toggle="dropdown" aria-expanded="false">
     Dropup
 </Dropdown.Toggle>
 <Dropdown.Menu as="ul">
     <Dropdown.Item as="li" href="#!">Action</Dropdown.Item>
     <Dropdown.Item as="li" href="#!">Another action</Dropdown.Item>
     <Dropdown.Item as="li" href="#!">Something else here</Dropdown.Item>
     <Dropdown.Divider  className="dropdown-divider" />
     <Dropdown.Item as="li" href="#!">Separated link</Dropdown.Item>
 </Dropdown.Menu>
</Dropdown>
<Dropdown drop="up"  className="btn-group dropup my-1">
 <Button variant='' type="button"  className="btn btn-info">
     Split dropup
 </Button>
 <Dropdown.Toggle variant='' type="button"
      className="btn btn-info dropdown-toggle dropdown-toggle-split"
     data-bs-toggle="dropdown" aria-expanded="false">
     <span  className="visually-hidden">Toggle Dropdown</span>
 </Dropdown.Toggle>
 <Dropdown.Menu as="ul">
     <Dropdown.Item as="li" href="#!">Action</Dropdown.Item>
     <Dropdown.Item as="li" href="#!">Another action</Dropdown.Item>
     <Dropdown.Item as="li" href="#!">Something else here</Dropdown.Item>
     <Dropdown.Divider  className="dropdown-divider" />
     <Dropdown.Item as="li" href="#!">Separated link</Dropdown.Item>
 </Dropdown.Menu>
</Dropdown>`;

export const dropdown9 = ` <Dropdown  className="btn-group dropend my-1 me-2" drop="end">
 <Dropdown.Toggle variant='' type="button"  className="btn btn-primary dropdown-toggle"
     data-bs-toggle="dropdown" aria-expanded="false">
     Dropright
 </Dropdown.Toggle>
 <Dropdown.Menu as="ul">
     <Dropdown.Item as="li" href="#!">Action</Dropdown.Item>
     <Dropdown.Item as="li" href="#!">Another action</Dropdown.Item>
     <Dropdown.Item as="li" href="#!">Something else here</Dropdown.Item>
     <Dropdown.Divider  className="dropdown-divider" />
     <Dropdown.Item as="li" href="#!">Separated link</Dropdown.Item>
 </Dropdown.Menu>
</Dropdown>
<Dropdown drop="end"  className="btn-group dropend my-1">
 <Button variant='' type="button"  className="btn btn-info">
     Split dropend
 </Button>
 <Dropdown.Toggle variant='' type="button"
      className="btn btn-info dropdown-toggle dropdown-toggle-split"
     data-bs-toggle="dropdown" aria-expanded="false">
     <span  className="visually-hidden">Toggle Dropright</span>
 </Dropdown.Toggle>
 <Dropdown.Menu as="ul">
     <Dropdown.Item as="li" href="#!">Action</Dropdown.Item>
     <Dropdown.Item as="li" href="#!">Another action</Dropdown.Item>
     <Dropdown.Item as="li" href="#!">Something else here</Dropdown.Item>
     <Dropdown.Divider  className="dropdown-divider" />
     <Dropdown.Item as="li" href="#!">Separated link</Dropdown.Item>
 </Dropdown.Menu>
</Dropdown>`;

export const dropdown10 = `<Dropdown  className="btn-group dropstart my-1 me-2" drop="start">
 <Dropdown.Toggle variant='' type="button"  className="btn btn-primary dropdown-toggle"
     data-bs-toggle="dropdown" aria-expanded="false">
     Dropstart
 </Dropdown.Toggle>
 <Dropdown.Menu as="ul">
     <Dropdown.Item as="li" href="#!">Action</Dropdown.Item>
     <Dropdown.Item as="li" href="#!">Another action</Dropdown.Item>
     <Dropdown.Item as="li" href="#!">Something else here</Dropdown.Item>
     <Dropdown.Divider  className="dropdown-divider" />
     <Dropdown.Item as="li" href="#!">Separated link</Dropdown.Item>
 </Dropdown.Menu>
 </Dropdown>
 <div  className="btn-group">
 <Dropdown  className="btn-group dropstart my-1" role="group" drop="start">
     <Dropdown.Toggle variant='' type="button"
          className="btn btn-info dropdown-toggle dropdown-toggle-split"
         data-bs-toggle="dropdown" aria-expanded="false">
         <span  className="visually-hidden">Toggle Dropstart</span>
     </Dropdown.Toggle>
     <Dropdown.Menu as="ul">
         <Dropdown.Item as="li" href="#!">Action</Dropdown.Item>
         <Dropdown.Item as="li" href="#!">Another action</Dropdown.Item>
         <Dropdown.Item as="li" href="#!">Something else here</Dropdown.Item>
         <Dropdown.Divider  className="dropdown-divider" />
         <Dropdown.Item as="li" href="#!">Separated link</Dropdown.Item>
     </Dropdown.Menu>
 </Dropdown>
 <Button variant='' type="button"  className="btn btn-info my-1">
     Split dropstart
 </Button>
 </div>`;

export const dropdown11 = `<Dropdown>
 <Dropdown.Toggle variant='' type="button"  className="btn btn-primary dropdown-toggle"
     data-bs-toggle="dropdown" aria-expanded="false">
     Dropstart
 </Dropdown.Toggle>
 <Dropdown.Menu as="ul">
     <Dropdown.Item as="li" href="#!">Regular link</Dropdown.Item>
     <Dropdown.Item  className="dropdown-item active" href="#!" aria-current="true">Active
         link
     </Dropdown.Item>
     <Dropdown.Item as="li" href="#!">Another link</Dropdown.Item>
 </Dropdown.Menu>
</Dropdown>`;

export const dropdown12 = `  <Dropdown>
 <Dropdown.Toggle variant='' type="button"  className="btn btn-primary dropdown-toggle"
     data-bs-toggle="dropdown" aria-expanded="false">
     Dropstart
 </Dropdown.Toggle>
 <Dropdown.Menu as="ul">
     <Dropdown.Item as="li" href="#!">Regular link</Dropdown.Item>
     <Dropdown.Item  className="dropdown-item disabled" href="#!" aria-current="true">Active
         link</Dropdown.Item>
     <Dropdown.Item as="li" href="#!">Another link</Dropdown.Item>
 </Dropdown.Menu>
</Dropdown>`;

export const dropdown13 = `{AutocloseButtons.map((idx) => (
    <div  className="btn-group" key={Math.random()}>
        <Dropdown>
            <Dropdown.Toggle variant={idx.class}  className="btn btn-primary dropdown-toggle" type="button"
                id="defaultDropdown" data-bs-toggle="dropdown" data-bs-auto-close="true"
                aria-expanded="false">
                {idx.text}
            </Dropdown.Toggle>
            <Dropdown.Menu as="ul" aria-labelledby="defaultDropdown">
                <Dropdown.Item as="li" href="#!">Menu item</Dropdown.Item>
                <Dropdown.Item as="li" href="#!">Menu item</Dropdown.Item>
                <Dropdown.Item as="li" href="#!">Menu item</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    </div>
))}`;

export const dropdown14 = `  <Dropdown>
 <Dropdown.Toggle variant=''  className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2"
     data-bs-toggle="dropdown" aria-expanded="false">
     Dropdown
 </Dropdown.Toggle>
 <Dropdown.Menu  className="dropdown-menu">
     <Form  className="px-4 py-3">
         <div  className="mb-3">
             <Form.Label htmlFor="exampleDropdownFormEmail1"  className="form-label">Email
                 address</Form.Label>
             <Form.Control type="email"  className="form-control" id="exampleDropdownFormEmail1"
                 placeholder="email@example.com" />
         </div>
         <div  className="mb-3">
             <Form.Label htmlFor="exampleDropdownFormPassword1"
                  className="form-label">Password</Form.Label>
             <Form.Control type="password"  className="form-control"
                 id="exampleDropdownFormPassword1" placeholder="Password" />
         </div>
         <div  className="mb-3">
             <div  className="form-check">
                 <input type="checkbox"  className="form-check-input" id="dropdownCheck" />
                 <label  className="form-check-label" htmlFor="dropdownCheck">
                     Remember me
                 </label>
             </div>
         </div>
         <Button variant='' type="submit"  className="btn btn-primary">Sign in</Button>
     </Form>
     <div  className="dropdown-divider"></div>
     <Dropdown.Item as="li" href="#!">New around here? Sign up</Dropdown.Item>
     <Dropdown.Item as="li" href="#!">Forgot password?</Dropdown.Item>
 </Dropdown.Menu>
</Dropdown>`;

export const dropdown15 = `<p  className="card-title mb-3">Use <code>.dropdown-center</code> on the parent element.
 </p>
 <Dropdown  className="dropdown-center">
     <Dropdown.Toggle variant=''  className="btn btn-primary dropdown-toggle" type="button"
         id="dropdownCenterBtn" data-bs-toggle="dropdown" aria-expanded="false">
         Centered dropdown
     </Dropdown.Toggle>
     <Dropdown.Menu as="ul" aria-labelledby="dropdownCenterBtn">
         <Dropdown.Item as="li" href="#!">Action</Dropdown.Item>
         <Dropdown.Item as="li" href="#!">Action two</Dropdown.Item>
         <Dropdown.Item as="li" href="#!">Action three</Dropdown.Item>
     </Dropdown.Menu>
 </Dropdown>`;

export const dropdown16 = `<p  className="card-title mb-3">Use <code>.dropup-center</code>
 on the parent element.
</p>
<Dropdown  className="dropup-center dropup" drop="up">
 <Dropdown.Toggle variant=''  className="btn btn-secondary dropdown-toggle" type="button"
     id="dropupCenterBtn" data-bs-toggle="dropdown" aria-expanded="false">
     Centered dropup
 </Dropdown.Toggle>
 <Dropdown.Menu as="ul" aria-labelledby="dropupCenterBtn">
     <Dropdown.Item as="li" href="#!">Action</Dropdown.Item>
     <Dropdown.Item as="li" href="#!">Action two</Dropdown.Item>
     <Dropdown.Item as="li" href="#!">Action three</Dropdown.Item>
 </Dropdown.Menu>
</Dropdown>`;

export const dropdown17 = `<p  className="card-title mb-3">You can use <code>&lt;a&gt;</code> or <code>&lt;button&gt;</code> as
 dropdown items.</p>
<Dropdown  className="dropdown">
 <Dropdown.Toggle variant=''  className="btn btn-info dropdown-toggle" type="button"
     id="dropdownMenu1" data-bs-toggle="dropdown" aria-expanded="false">
     Dropdown
 </Dropdown.Toggle>
 <Dropdown.Menu as="ul" aria-labelledby="dropdownMenu1">
     <Dropdown.Item>Action</Dropdown.Item>
     <Dropdown.Item>Another action
     </Dropdown.Item>
     <Dropdown.Item>Something else
         here
     </Dropdown.Item>
 </Dropdown.Menu>
</Dropdown>`;

export const dropdown18 = `<p  className="card-title mb-3">Use <code>data-bs-offset</code> or <code>data-bs-reference</code> to change
 the location of the dropdown.</p>
 <div  className="d-flex align-items-center flex-wrap">
 <Dropdown  className="dropdown me-1 mt-1">
     <Dropdown.Toggle variant='' type="button"  className="btn btn-primary dropdown-toggle"
         id="dropdownMenuOffset" data-bs-toggle="dropdown" aria-expanded="false"
         data-bs-offset="10,20">
         Offset
     </Dropdown.Toggle>
     <Dropdown.Menu as="ul" aria-labelledby="dropdownMenuOffset">
         <Dropdown.Item as="li" href="#!">Action</Dropdown.Item>
         <Dropdown.Item as="li" href="#!">Another action</Dropdown.Item>
         <Dropdown.Item as="li" href="#!">Something else here</Dropdown.Item>
     </Dropdown.Menu>
 </Dropdown>
 <ButtonGroup  className="btn-group custom-btn-group mt-1">
     <Button variant='' type="button"  className="btn btn-info">Reference</Button>
     <Dropdown>
         <Dropdown.Toggle variant='' type="button"
              className="btn btn-info dropdown-toggle dropdown-toggle-split"
             id="dropdownMenuReference" data-bs-toggle="dropdown"
             aria-expanded="false" data-bs-reference="parent">
             <span  className="visually-hidden">Toggle Dropdown</span>
         </Dropdown.Toggle>
         <Dropdown.Menu as="ul" aria-labelledby="dropdownMenuReference">
             <Dropdown.Item as="li" href="#!">Action</Dropdown.Item>
             <Dropdown.Item as="li" href="#!">Another action</Dropdown.Item>
             <Dropdown.Item as="li" href="#!">Something else here</Dropdown.Item>
             <Dropdown.Divider  className="dropdown-divider" />
             <Dropdown.Item as="li" href="#!">Separated link</Dropdown.Item>
         </Dropdown.Menu>
     </Dropdown>
 </ButtonGroup>
 </div>`;

export const dropdown19 = `<div  className="btn-list">
 {AlignmentButtons.map((idx) => (
     <div  className="btn-group" key={Math.random()}>
         <Dropdown drop={idx.dir}>
             <Dropdown.Toggle variant={idx.class}  className="btn btn-primary dropdown-toggle mb-0" type="button"
                 id="dropdownMenuButton" data-bs-toggle="dropdown"
                 aria-expanded="false">
                 {idx.text}
             </Dropdown.Toggle>
             <Dropdown.Menu as="ul" aria-labelledby="dropdownMenuButton">
                 <Dropdown.Item as="li" href="#!">Menu item</Dropdown.Item>
                 <Dropdown.Item as="li" href="#!">Menu item</Dropdown.Item>
                 <Dropdown.Item as="li" href="#!">Menu item</Dropdown.Item>
             </Dropdown.Menu>
         </Dropdown>
     </div>
 ))}
 </div>`;

export const dropdown20 = ` <Dropdown>
 <Dropdown.Toggle variant=''  className="btn btn-dark dropdown-toggle" type="button"
     id="dropdownMenuButton3" data-bs-toggle="dropdown" aria-expanded="false">
     Dropdown button
 </Dropdown.Toggle>
 <Dropdown.Menu as="ul"  className="dropdown-menu dropdown-menu-dark">
     <Dropdown.Item as="li" href="#!">Action</Dropdown.Item>
     <Dropdown.Item as="li" href="#!">Another action</Dropdown.Item>
     <Dropdown.Item as="li" href="#!">Something else here</Dropdown.Item>
 </Dropdown.Menu>
</Dropdown>`;

export const dropdown21 = ` <Dropdown>
 <Dropdown.Toggle variant='' type="button"  className="btn btn-primary dropdown-toggle"
     data-bs-toggle="dropdown" aria-expanded="false">
     Right-aligned menu example
 </Dropdown.Toggle>
 <Dropdown.Menu  className="dropdown-menu dropdown-menu-end">
     <Dropdown.Item>Action
     </Dropdown.Item>
     <Dropdown.Item>Another
         action</Dropdown.Item>
     <Dropdown.Item>Something else
         here
     </Dropdown.Item>
 </Dropdown.Menu>
</Dropdown>`;

export const dropdown22 = `<div  className="btn-group">
 <DropdownButton as={ButtonGroup} align={{ lg: 'end' }} title="Left-aligned but right aligned when large screen" id="dropdown-menu-align-responsive-1"  className="text-wrap">
     <Dropdown.Item eventKey="1">Action 1</Dropdown.Item>
     <Dropdown.Item eventKey="2">Action 2</Dropdown.Item>
 </DropdownButton>
 </div>`;

export const dropdown23 = ` <div  className="btn-group">
 <DropdownButton as={ButtonGroup} align={{ lg: 'start' }} title="Left-aligned but right aligned when large screen"  className="text-wrap" id="dropdown-menu-align-responsive-1">
     <Dropdown.Item eventKey="1">Action 1</Dropdown.Item>
     <Dropdown.Item eventKey="2">Action 2</Dropdown.Item>
 </DropdownButton>
</div>`;

export const dropdown24 = ` <Dropdown>
 <Dropdown.Toggle variant={idx.class}  className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
     {idx.text}
 </Dropdown.Toggle>
 <Dropdown.Menu  className="dropdown-menu-primary">
     <Dropdown.Item  className="dropdown-item" href="#!">Action</Dropdown.Item>
     <Dropdown.Item  className="dropdown-item" href="#!">Another action</Dropdown.Item>
     <Dropdown.Item  className="dropdown-item" href="#!">Something else here</Dropdown.Item>
 </Dropdown.Menu>
</Dropdown>`;

export const dropdown25 = ` <div  className="btn-list">
 {GhostButtons.map((idx) => (
     <div  className="btn-group" key={Math.random()}>
         <Dropdown>
             <Dropdown.Toggle variant={idx.class} type="button"  className="btn btn-primary-ghost dropdown-toggle"
                 data-bs-toggle="dropdown" aria-expanded="false">
                 {idx.text}
             </Dropdown.Toggle>
             <Dropdown.Menu>
                 <Dropdown.Item  className="dropdown-item" href="#!">Action</Dropdown.Item>
                 <Dropdown.Item  className="dropdown-item" href="#!">Another action</Dropdown.Item>
                 <Dropdown.Item  className="dropdown-item" href="#!">Something else here</Dropdown.Item>
                 <Dropdown.Divider  className="dropdown-divider" />
                 <Dropdown.Item  className="dropdown-item" href="#!">Separated link</Dropdown.Item>
             </Dropdown.Menu>
         </Dropdown>
     </div>
 ))}
</div>`;

export const dropdown26 = `<p  className="card-title mb-3">Use <code>.dropdown-item-text.</code> to create non-interactive dropdown items.</p>
 <div  className="bd-example">
     <Dropdown.Menu  className="dropdown-menu" show>
         <Dropdown.Item><span  className="dropdown-item-text">Dropdown item text</span>
         </Dropdown.Item>
         <Dropdown.Item href="#!">Action</Dropdown.Item>
         <Dropdown.Item href="#!">Another action</Dropdown.Item>
         <Dropdown.Item href="#!">Something else here
         </Dropdown.Item>
     </Dropdown.Menu>
 </div>`;

export const dropdown27 = `<p  className="card-titlte mb-3">Add a <code>.dropdown-header</code> to label sections of actions in any dropdown menu.</p>
 <div  className="bd-example">
     <Dropdown.Menu show>
         <Dropdown.Header>
             <h6  className="dropdown-header">Dropdown header</h6>
         </Dropdown.Header>
         <Dropdown.Item  className="dropdown-item" href="#!">Action</Dropdown.Item>
         <Dropdown.Item  className="dropdown-item" href="#!">Another action</Dropdown.Item>
         <Dropdown.Item  className="dropdown-item" href="#!">Something else here</Dropdown.Item>
     </Dropdown.Menu>
 </div>`;

export const dropdown28 = ` <div  className="bd-example">
 <Dropdown.Menu  className="dropdown-menu" show>
     <Dropdown.Header>Heading</Dropdown.Header>
     <Dropdown.Item  className="dropdown-item" href="#!">Action</Dropdown.Item>
     <Dropdown.Item  className="dropdown-item" href="#!">Another action</Dropdown.Item>
     <Dropdown.Item  className="dropdown-item" href="#!">Something else here</Dropdown.Item>
     <Dropdown.Divider  className="dropdown-divider" />
     <Dropdown.Item  className="dropdown-item" href="#!">Separated link</Dropdown.Item>
 </Dropdown.Menu>
</div>`;

export const dropdown29 = ` <div  className="bd-example">
 <Dropdown.Menu show  className="dropdown-menu p-4 text-muted" style={{ maxWidth: 200 }}>
     <p>
         Some example text that's free-flowing within the dropdown menu.
     </p>
     <p  className="mb-0">
         And this is more example text.
     </p>
 </Dropdown.Menu>
</div>`;
/*------ Dropdowns(prism-code for showcode purpose) end ------*/

/*------ Images &figures (prism-code for showcode purpose) start ------*/
export const image1 = ` <div  className="text-center">
<img src="../../../assets/images/media/media-48.jpg"  className="img-fluid" alt="..."/>
</div>`;

export const image2 = `<div  className="text-center">
<img src="../../../assets/images/media/media-49.jpg"   className="img-fluid rounded" alt="..."/>
</div>`;

export const image3 = ` <div  className="text-center">
<img src="../../../assets/images/media/media-50.jpg"  className="img-fluid rounded-pill" alt="..."/>
</div>`;

export const image4 = ` <div  className="text-center">
<div  className="d-inline-block">
<img  className="rounded float-start" src="../../../assets/images/media/media-53.jpg" alt="..." />
</div>
</div>`;

export const image5 = ` <img  className="rounded mx-auto d-block" 
src="../../../assets/images/media/media-55.jpg" alt="..."/>`;

export const image6 = ` <div  className="d-inline-block">
<img  className="rounded float-end" src="../../../assets/images/media/media-54.jpg" alt="..." />
</div>`;

export const image7 = ` <figure  className="figure">
<img  className="bd-placeholder-img figure-img img-fluid rounded card-img"
 src="../../../assets/images/media/media-56.jpg" alt="..."/>
<figcaption  className="figure-caption">A caption for the above image.
</figcaption>
</figure>
<figure  className="figure float-end">
<img  className="bd-placeholder-img figure-img img-fluid rounded card-img" 
src="../../../assets/images/media/media-57.jpg" alt="..."/>
<figcaption  className="figure-caption text-end">A caption for the above image.
</figcaption>
</figure>`;

export const image8 = ` <p  className="card-title mb-3">Use <code> .img-thumbnail 
</code>to give an image a rounded 1px border.</p>
 <div  className="text-center">
     <img src="../../../assets/images/media/media-51.jpg"
       className="img-thumbnail" alt="..."/>
 </div>`;

export const image9 = ` <div  className="text-center">
<img src="../../../assets/images/media/media-52.jpg"
  className="img-thumbnail rounded-pill" alt="..."/>
</div>`;
/*------ Images &figures (prism-code for showcode purpose) end ------*/

/*------ ListGroup (prism-code for showcode purpose) start ------*/
export const Listgroup1 = ` {BasicButtons.map((idx)=>(
    <ListGroup.Item as="li" key={Math.random()}>
        <div  className="d-flex align-items-center">
            <span  className="avatar avatar-sm">
                <img src={idx.src} alt="img"/>
            </span>
            <div  className="ms-2 fw-semibold">
                {idx.text}
            </div>
        </div>
    </ListGroup.Item>
    ))}`;

export const Listgroup2 = `  <ListGroup as="ul"><ListGroup.Item as="li">
<div  className="d-flex align-items-center">
    <div>
        <span  className="avatar avatar-sm bg-white text-default avatar-rounded">
            <i  className="bi bi-bell"></i>
        </span>
    </div>
    <div  className="ms-2">
        Notifications
    </div>
</div>
</ListGroup.Item>
</ListGroup>`;

export const Listgroup3 = ` <ListGroup as="ul">
<ListGroup.Item as="li" className="list-group-item disabled" aria-disabled="true">A disabled item meant to be disabled
</ListGroup.Item>
<ListGroup.Item as="li">Simply dummy text of the printing</ListGroup.Item>
<ListGroup.Item as="li">There are many variations of passages</ListGroup.Item>
<ListGroup.Item as="li">All the Lorem Ipsum generators</ListGroup.Item>
<ListGroup.Item as="li">Written in 45 BC. This book is a treatise on the theory</ListGroup.Item>
 </ListGroup>`;

export const Listgroup4 = ` <ListGroup variant='flush'  className="">
<ListGroup.Item  className="fw-semibold"><i  className="bi bi-envelope align-middle me-2 text-muted"></i>Asish Trivedhi<span  className="ms-1 text-muted fw-normal d-inline-block">(+1023-84534)</span></ListGroup.Item>
<ListGroup.Item  className="fw-semibold"><i  className="bi bi-tiktok align-middle me-2 text-muted"></i>Alezander Russo<span  className="ms-1 text-muted fw-normal d-inline-block">(+7546-12342)</span></ListGroup.Item>
<ListGroup.Item  className="fw-semibold"><i  className="bi bi-whatsapp align-middle me-2 text-muted"></i>Karem Smith<span  className="ms-1 text-muted fw-normal d-inline-block">(+9944-56632)</span></ListGroup.Item>
<ListGroup.Item  className="fw-semibold"><i  className="bi bi-facebook align-middle me-2 text-muted"></i>Melissa Brien<span  className="ms-1 text-muted fw-normal d-inline-block">(+1023-34323)</span></ListGroup.Item>
<ListGroup.Item  className="fw-semibold"><i  className="bi bi-instagram align-middle me-2 text-muted"></i>Kamala Harris<span  className="ms-1 text-muted fw-normal d-inline-block">(+91-63421)</span></ListGroup.Item>
</ListGroup>`;

export const Listgroup5 = `<ListGroup>
<Link to="#"  className="list-group-item list-group-item-action">
<div  className="d-flex align-items-center">
    <div>
        <span  className="avatar avatar-xs bg-secondary avatar-rounded">
            N
        </span>
    </div>
    <div  className="ms-2">New Jersey</div>
</div>
</Link>`;

export const Listgroup6 = ` <ListGroup  className="list-group">
<ListGroup.Item type="button"  className="list-group-item-action active" aria-current="true">Simply dummy text of the printing<span  className="badge float-end bg-primary">243</span></ListGroup.Item>
<ListGroup.Item type="button"  className="list-group-item-action">There are many variations of passages<span  className="badge float-end bg-secondary-transparent">35</span></ListGroup.Item>
<ListGroup.Item type="button"  className="list-group-item-action">All the Lorem Ipsum generators<span  className="badge float-end bg-info-transparent">132</span></ListGroup.Item>
<ListGroup.Item type="button"  className="list-group-item-action">All the Lorem Ipsum generators<span  className="badge float-end bg-success-transparent">2525</span></ListGroup.Item>
<ListGroup.Item type="button"  className="list-group-item-action" disabled>A disabled item meant to be disabled<span  className="badge float-end bg-danger-transparent">21</span></ListGroup.Item>
</ListGroup>`;

export const Listgroup7 = ` <ListGroup as="ul">
{ContextualButtons.map((idx)=>(
<ListGroup.Item as="li" variant={idx.class} key={Math.random()}>{idx.text}</ListGroup.Item>
))}</ListGroup>`;

export const Listgroup8 = `<ListGroup as="ul">
{ContextualButtons.map((idx)=>(
    <ListGroup.Item variant={idx.class} action  className=" list-group-item-action">{idx.text}</ListGroup.Item>
))}</ListGroup>`;

export const Listgroup9 = ` <ListGroup as="ul">
<ListGroup.Item  className="list-item-solid-primary">A simple primary list
group
item</ListGroup.Item>
<ListGroup.Item  className="list-item-solid-secondary">A simple secondary
list
group item</ListGroup.Item>
<ListGroup.Item  className="list-item-solid-success">A simple success list
group
item</ListGroup.Item>
<ListGroup.Item  className="list-item-solid-danger">A simple danger list
group
item</ListGroup.Item>
<ListGroup.Item  className="list-item-solid-warning">A simple warning list
group
item</ListGroup.Item>
<ListGroup.Item  className="list-item-solid-info">A simple info list group
item
</ListGroup.Item>
<ListGroup.Item  className="list-item-solid-light">A simple light list group
item
</ListGroup.Item>
<ListGroup.Item  className="list-item-solid-dark text-white">A simple dark list group
item
</ListGroup.Item> </ListGroup>`;

export const Listgroup10 = ` <ListGroup as="ul">
<ListGroup.Item  to="#"  className=" list-group-item-action">
<div  className="d-flex w-100 justify-content-between">
    <h6  className="mb-1 fw-semibold">Richard McClintock, a Latin professor?</h6>
    <small  className="text-muted">4 hrs ago</small>
</div>
<p  className="mb-1">Contrary to popular belief, Lorem Ipsum is not simply random text.
 It has roots in a piece of classical Latin literature.</p>
<small  className="text-muted">30,Nov 2022.</small>
</ListGroup.Item> </ListGroup>`;

export const Listgroup11 = ` <ListGroup as="ol" numbered>
{SubheadingsButtons.map((idx)=>(
<ListGroup.Item as="li"  className="list-group-item d-flex justify-content-between align-items-start" key={Math.random()}>
    <div  className="ms-2 me-auto text-muted">
        <div  className="fw-semibold fs-14 text-default">{idx.text1}</div>
        {idx.text2}
    </div>
    <Badge bg={idx.class}>{idx.text3}</Badge>
</ListGroup.Item>
))}</ListGroup>`;

export const Listgroup12 = ` <ListGroup as="ol" numbered>
<ListGroup.Item as="li">Simply dummy text of the printing.</ListGroup.Item>
<ListGroup.Item as="li">There are many variations of passages.</ListGroup.Item>
<ListGroup.Item as="li">All the Lorem Ipsum generators.</ListGroup.Item>
<ListGroup.Item as="li">Written in 45 BC. This book is a treatise on the theory.</ListGroup.Item>
<ListGroup.Item as="li">Randomised words which don't look.</ListGroup.Item>
<ListGroup.Item as="li">Always free from repetition, injected humour.</ListGroup.Item>
 </ListGroup>`;

export const Listgroup13 = ` <ListGroup as="ul">
<ListGroup.Item as="li">
    <input  className="form-check-input me-2 fw-semibold" type="checkbox" value=""
        aria-label="..." defaultChecked/>
        Accurate information at any given point.
</ListGroup.Item>
<ListGroup.Item as="li">
    <input  className="form-check-input me-2 fw-semibold" type="checkbox" value=""
        aria-label="..."/>
        Hearing the information and responding.
</ListGroup.Item>
<ListGroup.Item as="li">
    <input  className="form-check-input me-2 fw-semibold" type="checkbox" value=""
        aria-label="..." defaultChecked/>
        Setting up and customizing your own sales.
</ListGroup.Item>
<ListGroup.Item as="li">
    <input  className="form-check-input me-2 fw-semibold" type="checkbox" value=""
        aria-label="..." defaultChecked/>
        New Admin Launched.
</ListGroup.Item>
<ListGroup.Item as="li">
    <input  className="form-check-input me-2 fw-semibold" type="checkbox" value=""
        aria-label="..."/>
        To maximize profits and improve productivity.
</ListGroup.Item>
<ListGroup.Item as="li">
    <input  className="form-check-input me-2 fw-semibold" type="checkbox" value=""
        aria-label="..."/>
        To have a complete 360° overview of sales information, having.
</ListGroup.Item>
</ListGroup>`;

export const Listgroup14 = `<ListGroup  className="list-group">
<ListGroup.Item  className="list-group-item">
    <input  className="form-check-input me-1" type="radio" value=""
        name="list-radio" defaultChecked/>
        Accurate information at any given point.
</ListGroup.Item>
<ListGroup.Item  className="list-group-item">
    <input  className="form-check-input me-1" type="radio" value=""
        name="list-radio" defaultChecked/>
        Hearing the information and responding.
</ListGroup.Item>
<ListGroup.Item  className="list-group-item">
    <input  className="form-check-input me-1" type="radio" value=""
        name="list-radio" defaultChecked/>
        Setting up and customizing your own sales.
</ListGroup.Item>
<ListGroup.Item  className="list-group-item">
    <input  className="form-check-input me-1" type="radio" value=""
        name="list-radio"/>
        New Admin Launched.
</ListGroup.Item>
<ListGroup.Item  className="list-group-item">
    <input  className="form-check-input me-1" type="radio" value=""
        name="list-radio"/>
        To maximize profits and improve productivity.
</ListGroup.Item>
<ListGroup.Item  className="list-group-item">
    <input  className="form-check-input me-1" type="radio" value=""
        name="list-radio"/>
        To have a complete 360° overview of sales information, having.
</ListGroup.Item>
</ListGroup>`;

export const Listgroup15 = ` {ListbadgesButtons.map((idx) => (
    <ListGroup.Item key={Math.random()}
         className="list-group-item d-flex justify-content-between align-items-center fw-semibold">
        {idx.text1}
        <Badge bg={idx.class}  class={idx.color}>{idx.text2}</Badge>
    </ListGroup.Item>
    ))}`;

export const Listgroup16 = ` <ListGroup as="ul"  className="list-group list-group-horizontal-md">
<ListGroup.Item as="li">An item</ListGroup.Item>
<ListGroup.Item as="li">A second item</ListGroup.Item>
<ListGroup.Item as="li">A third item</ListGroup.Item>
</ListGroup>`;
/*------ ListGroup (prism-code for showcode purpose) end ------*/

/*------ objectfit (prism-code for showcode purpose) start ------*/
export const objectfit1 = ` <img src="../../../assets/images/media/media-28.jpg" 
 className="object-fit-contain border rounded" alt="..."/>`;

export const objectfit2 = `<img src="../../../assets/images/media/media-28.jpg" 
 className="object-fit-cover border rounded" alt="..."/>`;

export const objectfit3 = `<img src="../../../assets/images/media/media-28.jpg"
 className="object-fit-fill border rounded" alt="..."/>`;

export const objectfit4 = ` <img src="../../../assets/images/media/media-28.jpg"
 className="object-fit-scale border rounded" alt="..."/>`;

export const objectfit5 = ` <img src="../../../assets/images/media/media-28.jpg" 
 className="object-fit-none border rounded" alt="..."/>`;

export const objectfit6 = ` <img src="../../../assets/images/media/media-28.jpg" 
 className="object-fit-sm-contain border
 rounded" alt="..."/>`;

export const objectfit7 = ` <img src="../../../assets/images/media/media-28.jpg" 
 className="object-fit-md-contain border 
rounded" alt="..."/>`;

export const objectfit8 = ` <img src="../../../assets/images/media/media-28.jpg" 
 className="object-fit-lg-contain border 
rounded" alt="..."/>`;

export const objectfit9 = `<img src="../../../assets/images/media/media-28.jpg" 
 className="object-fit-xl-contain border 
rounded" alt="..."/>`;

export const objectfit10 = ` <img src="../../../assets/images/media/media-28.jpg" 
 className="object-fit-xxl-contain border
 rounded" alt="..."/>`;

export const objectfit11 = ` <video src="../../../assets/video/1.mp4" 
 className="object-fit-contain rounded border" autoPlay>
</video>`;

export const objectfit12 = ` <video src="../../../assets/video/1.mp4"
 className="object-fit-cover rounded border" autoPlay>
</video>`;

export const objectfit13 = `<video src="../../../assets/video/1.mp4"
 className="object-fit-fill rounded border" autoPlay>
</video>`;

export const objectfit14 = `<video src="../../../assets/video/1.mp4" 
 className="object-fit-scale rounded border" autoPlay>
</video>`;

export const objectfit15 = ` <video src="../../../assets/video/1.mp4"
 className="object-fit-none 
rounded border" autoPlay></video>`;
/*------ objectfit (prism-code for showcode purpose) end ------*/

/*------ Pagination (prism-code for showcode purpose) start ------*/
export const pagination1 = `<nav aria-label="Page navigation">
<Pagination as="ul"  className="pagination mb-0">
<Pagination.Item as="li" disabled href="#!">Previous
</Pagination.Item>
<Pagination.Item as="li" href="#!">1</Pagination.Item>
<Pagination.Item as="li" href="#!">2</Pagination.Item>
<Pagination.Item as="li" href="#!">Next</Pagination.Item>
</Pagination>
</nav>`;

export const pagination2 = ` <Pagination  className="pagination mb-0">
<Pagination.Item  className="page-item" as="li" href="#!" aria-label="Previous">
        <span aria-hidden="true"><i  className="bi bi-caret-left"></i></span></Pagination.Item>
<Pagination.Item as="li" href="#!">1</Pagination.Item>
<Pagination.Item as="li" href="#!">2</Pagination.Item>
<Pagination.Item as="li" href="#!">3</Pagination.Item>
<Pagination.Item as="li"  className="page-item" href="#!" aria-label="Next">
 <span aria-hidden="true"><i  className="bi bi-caret-right"></i></span></Pagination.Item> 
</Pagination>`;

export const pagination3 = `<nav aria-label="...">
<Pagination as="ul"  className="pagination pagination-sm mb-0">
	<Pagination.Item as="li" active aria-current="page">
		1
	</Pagination.Item>
	<Pagination.Item as="li" href="#!">2</Pagination.Item>
	<Pagination.Item as="li" href="#!">3</Pagination.Item>
</Pagination>
</nav>
<nav aria-label="...">
<Pagination as="ul"  className="pagination mb-0">
	<Pagination.Item as="li" active aria-current="page">
		1
	</Pagination.Item>
	<Pagination.Item as="li" href="#!">2</Pagination.Item>
	<Pagination.Item as="li" href="#!">3</Pagination.Item>
</Pagination>
</nav>
<nav aria-label="...">
<Pagination  className="pagination pagination-lg mb-0">
	<Pagination.Item as="li"  className=" active" aria-current="page">
		1
	</Pagination.Item>
	<Pagination.Item as="li" href="#!">2</Pagination.Item>
	<Pagination.Item as="li" href="#!">3</Pagination.Item>
</Pagination>
</nav>`;

export const pagination4 = `<nav aria-label="Page navigation">
<Pagination  className="justify-content-center">
    <Pagination.Item disabled>Previous
    </Pagination.Item>
    <Pagination.Item href="#!">1</Pagination.Item>
    <Pagination.Item href="#!">2</Pagination.Item>
    <Pagination.Item href="#!">3</Pagination.Item>
    <Pagination.Item  href="#!">Next
    </Pagination.Item>
</Pagination>
</nav>
<nav aria-label="Page navigation">
<Pagination  className="justify-content-end mb-0">
    <Pagination.Item disabled >Previous
    </Pagination.Item>
    <Pagination.Item href="#!">1</Pagination.Item>
    <Pagination.Item href="#!">2</Pagination.Item>
    <Pagination.Item href="#!">3</Pagination.Item>
    <Pagination.Item  href="#!">Next
    </Pagination.Item>
</Pagination>
</nav>`;

export const pagination5 = `<nav aria-label="..."  className="me-3">
<Pagination  className="pagination">
    <Pagination.Item disabled>Previous
    </Pagination.Item>
    <Pagination.Item  href="#!">1</Pagination.Item>
    <Pagination.Item active  aria-current="page"href="#!">2
    </Pagination.Item>
    <Pagination.Item  href="#!">Next
    </Pagination.Item>
</Pagination>
</nav>
<nav aria-label="...">
<Pagination  className="pagination">
    <Pagination.Item disabled>Previous
    </Pagination.Item>
    <Pagination.Item  href="#!">1</Pagination.Item>
    <Pagination.Item active aria-current="page">2
    </Pagination.Item>
    <Pagination.Item  href="#!">Next
    </Pagination.Item>
</Pagination>
</nav>`;

export const pagination6 = `<nav aria-label="Page navigation"  className="pagination-style-1">
<Pagination  className="pagination mb-0">
<Pagination.Item disabled href="#!">
<i  className="ri-arrow-left-s-line align-middle"></i>       
</Pagination.Item>
<Pagination.Item href="#!">1</Pagination.Item>
<Pagination.Item active href="#!">2</Pagination.Item>
<Pagination.Item href="#!">
<i  className="bi bi-three-dots"></i>
</Pagination.Item>
<Pagination.Item href="#!">21</Pagination.Item>
<Pagination.Item href="#!">
<i  className="ri-arrow-right-s-line align-middle"></i>
</Pagination.Item>
</Pagination>
</nav>`;

export const pagination7 = `<nav aria-label="Page navigation"  className="pagination-style-1">
<Pagination  className="pagination mb-0">
<Pagination.Item disabled href="#!">
<i  className="ri-arrow-left-s-line align-middle"></i>       
</Pagination.Item>
<Pagination.Item href="#!">1</Pagination.Item>
<Pagination.Item active href="#!">2</Pagination.Item>
<Pagination.Item href="#!">
<i  className="bi bi-three-dots"></i>
</Pagination.Item>
<Pagination.Item href="#!">21</Pagination.Item>
<Pagination.Item href="#!">
<i  className="ri-arrow-right-s-line align-middle"></i>
</Pagination.Item>
</Pagination>
</nav>`;

export const pagination8 = `<nav aria-label="Page navigation"  className="pagination-style-3">
<Pagination  className=" mb-0 flex-wrap">
<Pagination.Item as="li" disabled>Prev
</Pagination.Item>
<Pagination.Item as="li"  active href="#!">1</Pagination.Item>
<Pagination.Item as="li"  href="#!">2</Pagination.Item>
<Pagination.Item as="li"  href="#!">
<i  className="bi bi-three-dots"></i>        
</Pagination.Item>
<Pagination.Item as="li"  href="#!">16</Pagination.Item>
<Pagination.Item as="li"  className="pagination-next"
href="#!">next
</Pagination.Item>
</Pagination>
</nav>`;

export const pagination9 = `<nav aria-label="Page navigation" className="pagination-style-4">
<Pagination  className="mb-0 flex-wrap">
<Pagination.Item as="li"  disabled href="#!">
 Prev
</Pagination.Item>
<Pagination.Item as="li"  active href="#!">1</Pagination.Item>
<Pagination.Item as="li" href="#!">2</Pagination.Item>
<Pagination.Item as="li"  href="#!">
<i  className="bi bi-three-dots"></i>   
</Pagination.Item>
<Pagination.Item as="li" href="#!">16</Pagination.Item>
<Pagination.Item as="li" href="#!">17</Pagination.Item>
<Pagination.Item as="li"  className="pagination-next" href="#!">
 next       
</Pagination.Item>
</Pagination></nav>`;
/*------ Pagination (prism-code for showcode purpose) end ------*/

/*------ popovers (prism-code for showcode purpose) start ------*/
export const popovers1 = `{Defaultalerts.map((idx)=>(
    <OverlayTrigger trigger="click" placement={idx.class}  key={Math.random()}
    overlay={<Popover>
    <Popover.Header as="h3"> Popover {idx.text}</Popover.Header>
    <Popover.Body>
    Vivamus sagittis lacus vel augue laoreet rutrum faucibus.
    </Popover.Body>
    </Popover>}>
    <Button variant='' href="#!"  className="btn btn-outline-primary btn-wave">Popover {idx.text}</Button>
    </OverlayTrigger>))}`;

export const popovers2 = `<OverlayTrigger trigger="click" placement={idx.class}  key={Math.random()}
overlay={<Popover>
<Popover.Header as="h3" data-bs-custom- className="header-primary"> Color Header</Popover.Header>
   <Popover.Body>
   Popover with primary header.
 </Popover.Body>
    </Popover>}>
<Button variant={idx.color} href="#!"   className="btn btn-wave">Header {idx.text}</Button>
</OverlayTrigger> ))}`;

export const popovers3 = `<OverlayTrigger placement="top trigger="click" overlay={<Popover  className="popover-primary">
<Popover.Header as="h3">Color Background</Popover.Header>
<Popover.Body>Popover with primary background.</Popover.Body>
</Popover>}>
<Button variant="primary">Primary </Button>
</OverlayTrigger>`;

export const popovers4 = `<OverlayTrigger placement="top trigger="click" overlay={<Popover  className="popover-primary-light">
<Popover.Header as="h3">Light Background</Popover.Header>
<Popover.Body>Popover with light primary background.</Popover.Body>
</Popover>}>
<Button variant="primary-light">Primary </Button>
</OverlayTrigger>`;

export const popovers5 = `{Dismissiblealerts.map((idx) => (
	<OverlayTrigger rootClose={true} trigger="click" placement={idx.class} key={Math.random()}
		overlay={<Popover>
			<Popover.Header as="h3"> Dismissible Popover</Popover.Header>
			<Popover.Body>
				And here's some amazing content. It's very engaging. Right?
			</Popover.Body>
		</Popover>}>
		<Button variant={idx.color}  className="btn  btn-wave">Popover Dismiss</Button>
	</OverlayTrigger>
))}`;

export const popovers6 = `<OverlayTrigger placement='right' overlay={<Popover id="tooltip-disabled">
<Popover.Body>Disabled Popover!</Popover.Body>
</Popover>}>
<span  className="d-inline-block mb-3 mb-sm-1 me-2">
    <Button variant="primary" disabled>
        Disabled button
    </Button>
</span>
</OverlayTrigger>
<OverlayTrigger placement='right' overlay={<Popover id="tooltip-disabled">
<Popover.Body>Disabled Popover!</Popover.Body>
</Popover>}>
<span  className="d-inline-block mb-3 mb-sm-1 me-2">
    <Button variant="info" disabled>
        Disabled button
    </Button>
</span>
</OverlayTrigger>
<OverlayTrigger placement='right' overlay={<Popover id="tooltip-disabled">
<Popover.Body>Disabled Popover!</Popover.Body>
</Popover>}>
<span  className="d-inline-block">
    <Button variant="light" disabled>
        Disabled button
    </Button>
</span>
</OverlayTrigger>`;

export const popovers7 = `<OverlayTrigger placement='top' trigger="click" overlay={<Popover  class='popover-primary only-body' id="tooltip-disabled">
<Popover.Body>This popover is used to provide details about this icon.</Popover.Body>
</Popover>}>
<Link  className="me-4" href="#!">
    <svg xmlns="http://www.w3.org/2000/svg"  className="svg-primary"
     height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 
        2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 
        .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" /></svg>
</Link>
</OverlayTrigger>
<OverlayTrigger placement='top' trigger="click" overlay={<Popover 
    class='popover-secondary only-body' id="tooltip-disabled">
<Popover.Body>This popover is used to provide details about this icon.</Popover.Body>
</Popover>}>
<Link  className="me-4" href="#!" >
    <svg xmlns="http://www.w3.org/2000/svg"  className="svg-secondary" 
    height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 
    18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>
</Link>
</OverlayTrigger>
<OverlayTrigger placement='top' trigger="click" overlay={<Popover 
    class='popover-primary only-body' id="tooltip-disabled">
<Popover.Body>This popover is used to provide details about this icon.</Popover.Body>
</Popover>}>
<Link  className="me-4" href="#!">
<span  className="avatar avatar-md br-5 bg-warning-transparent text-warning ">
            <i  className="fe fe-box"></i></span>
</Link>
</OverlayTrigger>
<OverlayTrigger placement='top' trigger="click" overlay={<Popover
     class='popover-secondary only-body' id="tooltip-disabled">
<Popover.Body>This popover is used to provide details about this icon.</Popover.Body>
</Popover>}>
<Link  className="me-4" href="#!" >
<span  className="avatar avatar-md br-5 bg-teal-transparent text-teal ">
            <i  className="fe fe-zap"></i></span>
</Link>
</OverlayTrigger>`;
/*------ popovers (prism-code for showcode purpose) end ------*/

/*------ Progress (prism-code for showcode purpose) start ------*/
export const progress1 = `<ProgressBar variant="" now={0}  className="progress mb-3" />
<ProgressBar variant="" now={25}  className="progress mb-3" />
<ProgressBar variant="" now={50}  className="progress mb-3" />
<ProgressBar variant="" now={75}  className="progress mb-3" />
<ProgressBar variant="" now={100}  className="progress mb-0" />`;

export const progress2 = `<ProgressBar  variant='secondary' now={20}  className="progress mb-3" />
<ProgressBar  variant='warning' now={40}  className="progress mb-3" />
<ProgressBar  variant='info' now={60}  className="progress mb-3" />
<ProgressBar  variant='success' now={80}  className="progress mb-3" />
<ProgressBar  variant='danger' now={100}  className="progress mb-0" />`;

export const progress3 = `<ProgressBar striped variant='primary' now={10}  className="progress mb-3" />
<ProgressBar striped variant='secondary' now={25}  className="progress mb-3" />
<ProgressBar striped variant='success' now={50}  className="progress mb-3" />
<ProgressBar striped variant='info' now={75}  className="progress mb-3" />
<ProgressBar striped variant='warning' now={100}  className="progress mb-0" />`;

export const progress4 = `<ProgressBar  variant='primary' now={10}  className="progress progress-xs mb-3" />
<ProgressBar  variant='primary' now={25}  className="progress progress-sm mb-3" />
<ProgressBar  variant='primary' now={50}  className="progress  mb-3" />
<ProgressBar  variant='primary' now={75}  className="progress progress-lg mb-3" />
<ProgressBar  variant='primary' now={100} className="progress progress-xl mb-0" />`;

export const progress5 = `<ProgressBar  variant='primary'  className="progress mb-3" animated now={10} />
<ProgressBar  variant='secondary'  className="progress mb-3" animated now={20} />
<ProgressBar  variant='success'  className="progress mb-3" animated now={40} />
<ProgressBar  variant='info'  className="progress mb-3" animated now={60} />
<ProgressBar  variant='warning'  className="progress" animated now={80} />`;

export const progress6 = `<ProgressBar  variant='primary-gradient'  className="progress mb-3" animated now={10} />
<ProgressBar  variant='secondary-gradient'  className="progress mb-3" animated now={20} />
<ProgressBar  variant='success-gradient'  className="progress mb-3" animated now={40} />
<ProgressBar  variant='info-gradient'  className="progress mb-3" animated now={60} />
<ProgressBar  variant='warning-gradient'  className="progress" animated now={80} />`;

export const progress7 = `<ProgressBar variant='primary' now={10} label={10}  className="progress mb-3" />
<ProgressBar variant='secondary' now={20} label={20}  className="progress mb-3" />
<ProgressBar variant='success' now={40} label={40%}  className="progress mb-3" />
<ProgressBar variant='info' now={60} label={60}%  className="progress mb-3" />
<ProgressBar variant='warning' now={80} label={80%}  className="progress mb-0" />`;

export const progress8 = `<ProgressBar  className="progress-stacked progress-sm mb-3" >
<ProgressBar striped variant="warning" now={15} key={1} />
<ProgressBar variant="info" now={20} key={2} />
<ProgressBar striped variant="danger" now={25} key={3} />    
</ProgressBar>`;

export const progress9 = `<ProgressBar  variant='primary-gradient'  className="progress mb-3 progress-animate" animated now={10} />
<ProgressBar  variant='secondary-gradient'  className="progress mb-3 progress-animate" animated now={20} />
<ProgressBar  variant='success-gradient'  className="progress mb-3 progress-animate" animated now={40} />
<ProgressBar  variant='info-gradient'  className="progress mb-3 progress-animate" animated now={60} />
<ProgressBar  variant='warning-gradient'  className="progress  progress-animate" animated now={80} />`;

export const progress10 = `<div  className="progress progress-sm progress-custom mb-5 progress-animate">
<h6  className="progress-bar-title">Mobiles</h6>
<ProgressBar variant="primary"  className="w-100 custom-height1" now={50} />
</div>
<div  className="progress progress-sm progress-custom mb-5 progress-animate">
<h6  className="progress-bar-title bg-secondary">Watches</h6>
<ProgressBar variant="secondary"  className="w-100 custom-height1" now={60} />
</div>
<div  className="progress progress-sm progress-custom mb-5 progress-animate">
<h6  className="progress-bar-title bg-success">Shirts</h6>
<ProgressBar variant="success"  className="w-100 custom-height1" now={70} />
</div>`;

export const progress11 = `<ProgressBar  className="progress progress-sm mb-4">
<div  className="progress-item-1 bg-secondary"></div>
<div  className="progress-item-2 bg-secondary"></div>
<div  className="progress-item-3"></div>
<ProgressBar variant="secondary" now={60} />
</ProgressBar>`;

export const progress12 = `<ProgressBar  className="progress progress-lg mb-5 custom-progress-3 progress-animate">

<ProgressBar variant="" now={50} />
<div  className="progress-bar-value">50%</div>

</ProgressBar>
<ProgressBar  className="progress progress-lg mb-5 custom-progress-3 progress-animate">
<ProgressBar variant="secondary" now={60} />
<div  className="progress-bar-value secondary">60%</div>
</ProgressBar>
<ProgressBar  className="progress progress-lg custom-progress-3 progress-animate">
<ProgressBar variant="success" now={70} />
<div  className="progress-bar-value success">70%</div>
</ProgressBar>`;

export const progress13 = `<ProgressBar  className="progress progress-xl mb-3 progress-animate custom-progress-4">
<ProgressBar variant='secondary-gradient' now={20} />
<div  className="progress-bar-label">20%</div>
</ProgressBar>`;

export const progress14 = `<h6  className="fw-semibold mb-2">Project Dependencies</h6>
<ProgressBar  className="progress-stacked progress-xl mb-5" >
   <ProgressBar  variant="primary" now={25} label={25%} key={1} />
   <ProgressBar  variant="secondary" now={35} label={35%} key={2} />
   <ProgressBar  variant="danger" now={40} label={40%} key={3} />    
</ProgressBar>
<Row  className="justify-content-center">
    <Col xl={5}>
        <div  className="border p-3">
            <p  className="fs-12 fw-semibold mb-0 text-muted">Html<span  className="float-end fs-10 fw-normal">25%<
            /span></p>
            <ProgressBar  className="progress progress-xs mb-4 progress-animate"  variant="primary" now={25} />   
            <p  className="fs-12 fw-semibold mb-0 text-muted">Css<span  className="float-end fs-10 fw-normal">35%
            </span></p>
            <ProgressBar  className="progress progress-xs mb-4 progress-animate"  variant="secondary" now={35} />  
            <p  className="fs-12 fw-semibold mb-0 text-muted">Js<span  className="float-end fs-10 fw-normal">40%
            </span></p>
            <ProgressBar  className="progress progress-xs mb-4 progress-animate"  variant="danger" now={40} />  
        </div>
    </Col>
</Row>`;
/*------ Progress (prism-code for showcode purpose) end ------*/

/*------ spinners (prism-code for showcode purpose) start ------*/
export const spinner1 = `  <div  className="spinner-border  text-primary" role="status">
<span  className="visually-hidden">Loading...</span>
</div>`;

export const spinner2 = ` <div  className="spinner-border text-secondary" role="status">
<span  className="visually-hidden">Loading...</span>
</div>
<div  className="spinner-border text-success" role="status">
<span  className="visually-hidden">Loading...</span>
</div>
<div  className="spinner-border text-danger" role="status">
<span  className="visually-hidden">Loading...</span>
</div>
<div  className="spinner-border text-warning" role="status">
<span  className="visually-hidden">Loading...</span>
</div>
<div  className="spinner-border text-info" role="status">
<span  className="visually-hidden">Loading...</span>
</div>
<div  className="spinner-border text-light" role="status">
<span  className="visually-hidden">Loading...</span>
</div>
<div  className="spinner-border text-dark" role="status">
<span  className="visually-hidden">Loading...</span>
</div>`;

export const spinner3 = `<div  className="spinner-grow text-primary" role="status">
<span  className="visually-hidden">Loading...</span>
</div>`;

export const spinner4 = `<div  className="spinner-grow text-secondary" role="status">
<span  className="visually-hidden">Loading...</span>
</div>
<div  className="spinner-grow text-success" role="status">
<span  className="visually-hidden">Loading...</span>
</div>
<div  className="spinner-grow text-danger" role="status">
<span  className="visually-hidden">Loading...</span>
</div>
<div  className="spinner-grow text-warning" role="status">
<span  className="visually-hidden">Loading...</span>
</div>
<div  className="spinner-grow text-info" role="status">
<span  className="visually-hidden">Loading...</span>
</div>
<div  className="spinner-grow text-light" role="status">
<span  className="visually-hidden">Loading...</span>
</div>
<div  className="spinner-grow text-dark" role="status">
<span  className="visually-hidden">Loading...</span>
</div>`;

export const spinner5 = `<div  className="d-flex justify-content-center mb-4">
<div  className="spinner-border text-primary" role="status">
    <span  className="visually-hidden">Loading...</span>
</div>
</div>
<div  className="d-flex align-items-center">
<strong>Loading...</strong>
<div  className="spinner-border text-primary ms-auto" role="status" aria-hidden="true"></div>
</div>`;

export const spinner6 = ` <div  className="clearfix mb-4">
<div  className="spinner-border text-primary float-end" role="status">
    <span  className="visually-hidden">Loading...</span>
</div>
</div>
<div  className="clearfix">
<div  className="spinner-border text-primary float-start" role="status">
    <span  className="visually-hidden">Loading...</span>
</div>
</div>`;

export const spinner7 = ` <div  className="text-center">
<div  className="spinner-border text-primary" role="status">
    <span  className="visually-hidden">Loading...</span>
</div>
</div>`;

export const spinner8 = `<div  className="spinner-border text-primary spinner-border-sm me-4" role="status">
<span  className="visually-hidden">Loading...</span>
</div>
<div  className="spinner-grow text-primary spinner-grow-sm me-4" role="status">
<span  className="visually-hidden">Loading...</span>
</div>
<div  className="spinner-border text-primary me-4" style={{ width: '3rem', height: '3rem' }}
role="status">
<span  className="visually-hidden">Loading...</span>
</div>
<div  className="spinner-grow text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
<span  className="visually-hidden">Loading...</span>
</div>`;

export const spinner9 = ` <div  className="spinner-border text-primary m-5" role="status">
<span  className="visually-hidden">Loading...</span>
</div>`;

export const spinner10 = ` <div  className="btn-list">
<Button variant='primary-light'  className="btn" type="button" disabled>
    <span  className="spinner-border spinner-border-sm align-middle" role="status"
        aria-hidden="true"></span>
    <span  className="visually-hidden">Loading...</span>
</Button>
<Button variant='primary-light'  className="btn" type="button" disabled>
    <span  className="spinner-border spinner-border-sm align-middle" role="status"
        aria-hidden="true"></span>
    Loading...
</Button>
<Button variant='primary-light'  className="btn" type="button" disabled>
    <span  className="spinner-grow spinner-grow-sm align-middle" role="status"
        aria-hidden="true"></span>
    <span  className="visually-hidden">Loading...</span>
</Button>
{Buttonspinner.map((idx) => (
<Button variant={idx.color}  className="" type="button" disabled key={Math.random()}>
    <span  className="spinner-grow spinner-grow-sm align-middle" role="status"
        aria-hidden="true"></span>
    Loading...
</Button>
))}
</div>`;
/*------ spinners (prism-code for showcode purpose) end ------*/

/*------ tooltips (prism-code for showcode purpose) start ------*/
export const tooltip1 = `  {Tooltipdirtooltip.map((idx)=>(
    <OverlayTrigger placement={idx.text} overlay={<Tooltip>Tooltip on {idx.text} </Tooltip>} key={Math.random()}>
    <Button type="button"  className="btn btn-primary btn-wave">
    Tooltip on {idx.text}
    </Button>
    </OverlayTrigger>
    ))}`;

export const tooltip2 = `  {Tooltipdirtooltip.map((idx)=>(
    <OverlayTrigger placement={idx.text} overlay={<Tooltip>Tooltip on {idx.text} </Tooltip>} key={Math.random()}>
    <Button type="button"  className="btn btn-primary btn-wave">
    Tooltip on {idx.text}
    </Button>
    </OverlayTrigger>
    ))}`;

export const tooltip3 = `  <p  className="text-muted mb-0">
Hover on the link to view the
<OverlayTrigger placement="top" overlay={<Tooltip  class='tooltip-primary'>
Link Tooltip </Tooltip>}>
<Link href="#!"  className="text-primary">Tooltip</Link>
     </OverlayTrigger> 
</p>`;

export const tooltip4 = `<OverlayTrigger placement="top" overlay={
    <Tooltip  className="tooltip-secondary">Message </Tooltip>}>
    <Link href="#!"   className="me-3">
        <svg xmlns="http://www.w3.org/2000/svg"  className="svg-secondary" 
        height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
            <path d="M0 0h24v24H0V0z" fill="none"/><path 
    d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 
    2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/>
            </svg>
    </Link>
    </OverlayTrigger>`;

export const tooltip5 = `  <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Disabled tooltip!</Tooltip>}>
<span  className="d-inline-block">
 <Button disabled style={{ pointerEvents: 'none' }}>
            Disabled button
      </Button>
   </span>
</OverlayTrigger>`;

export const tooltip6 = `<OverlayTrigger placement="top" overlay={<Tooltip  className="tooltip-primary">Alex Carey</Tooltip>}>
<Link href="#!"
     className="avatar avatar-md me-2 online avatar-rounded">
    <img src="../../../assets/images/faces/12.jpg" alt="img" />
</Link>
</OverlayTrigger>

<OverlayTrigger placement="top" overlay={<Tooltip  className="tooltip-primary">Marina Kai</Tooltip>}>
<Link href="#!"
     className="avatar avatar-lg me-2 online avatar-rounded">
    <img src="../../../assets/images/faces/3.jpg" alt="img" />
</Link>
</OverlayTrigger>
<OverlayTrigger placement="top" overlay={<Tooltip  className="tooltip-primary">Tim Cook</Tooltip>}>
<Link href="#!"
     className="avatar avatar-xl me-2 online avatar-rounded">
    <img src="../../../assets/images/faces/15.jpg" alt="img" />
</Link>
</OverlayTrigger>`;
/*------ tooltips (prism-code for showcode purpose) end ------*/

/*------ Toasts (prism-code for showcode purpose) start ------*/
export const toast1 = `<ToastContainer   className="toast-container position-fixed top-0 start-0 p-3">
<Toast id="topleft-Toast"  className="toast colored-toast bg-primary-transparent text-primary"
 onClose={() => setShow13(false)} show={show13} delay={3000} autohide>
    <Toast.Header  className="toast-header bg-primary text-fixed-white">
        <img  className="bd-placeholder-img rounded me-2" src="../../../assets/images/brand-logos/toggle-dark.png" alt="..."/>
        <strong  className="me-auto">Nowa</strong>
        <button type="button"  className="btn-close" data-bs-dismiss="toast"
            aria-label="Close"></button>
    </Toast.Header>
    <Toast.Body  className="toast-body">
        Your,toast message here.
    </Toast.Body>
</Toast>
</ToastContainer>
<ToastContainer   className="toast-container position-fixed top-0 start-50 translate-middle-x p-3">
<Toast id="topcenter-Toast"  className="toast colored-toast bg-primary-transparent text-primary" onClose={() => setShow14(false)} show={show14} delay={3000} autohide>
    <Toast.Header  className="toast-header bg-primary text-fixed-white">
        <img  className="bd-placeholder-img rounded me-2" src="../../../assets/images/brand-logos/toggle-dark.png" alt="..."/>
        <strong  className="me-auto">Nowa</strong>
    </Toast.Header>
    <Toast.Body  className="toast-body">
        Your,toast message here.
    </Toast.Body>
</Toast>
</ToastContainer>
<ToastContainer   className="toast-container position-fixed top-0 end-0 p-3">
<Toast id="topright-Toast"  className="toast colored-toast bg-primary-transparent text-primary"
 onClose={() => setShow15(false)} show={show15} delay={3000} autohide>
    <Toast.Header  className="toast-header bg-primary text-fixed-white">
        <img  className="bd-placeholder-img rounded me-2" src="../../../assets/images/brand-logos/toggle-dark.png" alt="..."/>
        <strong  className="me-auto">Nowa</strong>
    </Toast.Header>
    <Toast.Body  className="toast-body">
        Your,toast message here.
    </Toast.Body>
</Toast>
</ToastContainer>
<ToastContainer   className="toast-container position-fixed top-50 start-0 translate-middle-y p-3">
<Toast id="middleleft-Toast"  className="toast colored-toast bg-primary-transparent text-primary" 
   onClose={() => setShow16(false)} show={show16} delay={3000} autohide>
    <Toast.Header  className="toast-header bg-primary text-fixed-white">
        <img  className="bd-placeholder-img rounded me-2" src="../../../assets/images/brand-logos/toggle-dark.png" alt="..."/>
        <strong  className="me-auto">Nowa</strong>
    </Toast.Header>
    <Toast.Body  className="toast-body">
        Your,toast message here.
    </Toast.Body>
</Toast>
</ToastContainer>
<ToastContainer   className="toast-container position-fixed top-50 start-50 translate-middle">
<Toast id="middlecenter-Toast"  className="toast colored-toast bg-primary-transparent text-primary"
  onClose={() => setShow17(false)} show={show17} delay={3000} autohide>
    <Toast.Header  className="toast-header bg-primary text-fixed-white">
        <img  className="bd-placeholder-img rounded me-2" src="../../../assets/images/brand-logos/toggle-dark.png" alt="..."/>
        <strong  className="me-auto">Nowa</strong>
    </Toast.Header>
    <Toast.Body  className="toast-body">
        Your,toast message here.
    </Toast.Body>
</Toast>
</ToastContainer>
<ToastContainer   className="toast-container position-fixed top-50 end-0 translate-middle-y p-3">
<Toast id="middleright-Toast"  className="toast colored-toast bg-primary-transparent text-primary"
  onClose={() => setShow18(false)} show={show18} delay={3000} autohide>
    <Toast.Header  className="toast-header bg-primary text-fixed-white">
        <img  className="bd-placeholder-img rounded me-2" src="../../../assets/images/brand-logos/toggle-dark.png" alt="..."/>
        <strong  className="me-auto">Nowa</strong>
    </Toast.Header>
    <Toast.Body  className="toast-body">
        Your,toast message here.
    </Toast.Body>
</Toast>
</ToastContainer>
<ToastContainer   className="toast-container position-fixed bottom-0 start-0 p-3">
<Toast id="bottomleft-Toast"  className="toast colored-toast bg-primary-transparent text-primary"
onClose={() => setShow19(false)} show={show19} delay={3000} autohide>
    <Toast.Header  className="toast-header bg-primary text-fixed-white">
        <img  className="bd-placeholder-img rounded me-2" src="../../../assets/images/brand-logos/toggle-dark.png" alt="..."/>
        <strong  className="me-auto">Nowa</strong>
    </Toast.Header>
    <Toast.Body  className="toast-body">
        Your,toast message here.
    </Toast.Body>
</Toast>
</ToastContainer>
<ToastContainer   className="toast-container position-fixed bottom-0 start-50 translate-middle-x p-3">
<Toast id="bottomcenter-Toast"  className="toast colored-toast bg-primary-transparent text-primary" 
 onClose={() => setShow20(false)} show={show20} delay={3000} autohide>
    <Toast.Header  className="toast-header bg-primary text-fixed-white">
        <img  className="bd-placeholder-img rounded me-2" src="../../../assets/images/brand-logos/toggle-dark.png" alt="..."/>
        <strong  className="me-auto">Nowa</strong>
    </Toast.Header>
    <Toast.Body  className="toast-body">
        Your,toast message here.
    </Toast.Body>
</Toast>
</ToastContainer>
<ToastContainer   className="toast-container position-fixed bottom-0 end-0 p-3">
<Toast id="bottomright-Toast"  className="toast colored-toast bg-primary-transparent text-primary" 
 onClose={() => setShow21(false)} show={show21} delay={3000} autohide>
    <Toast.Header  className="toast-header bg-primary text-fixed-white">
        <img  className="bd-placeholder-img rounded me-2" src="../../../assets/images/brand-logos/toggle-dark.png" alt="..."/>
        <strong  className="me-auto">Nowa</strong>
    </Toast.Header>
    <Toast.Body  className="toast-body">
        Your,toast message here.
    </Toast.Body>
</Toast>
</ToastContainer>`;

export const toast2 = `<Toast id="primaryToast" bg="primary-transparent"  className="toast colored-toast" 
onClose={() => setShow1(false)} show={show1} delay={3000} autohide
    aria-atomic="true">
    <Toast.Header  className="toast-header bg-primary text-fixed-white">
        <img  className="bd-placeholder-img rounded me-2" 
    src="../../../assets/images/brand-logos/toggle-dark.png" alt="..."/>
        <strong  className="me-auto">Nowa</strong>
    </Toast.Header>
    <Toast.Body>
        Your,toast message here.
    </Toast.Body>
</Toast>
<Toast id="secondaryToast"  className="toast colored-toast bg-secondary-transparent" 
role="alert" aria-live="assertive"
    aria-atomic="true"  onClose={() => setShow2(false)} show={show2} delay={3000} autohide>
    <Toast.Header  className="toast-header bg-secondary text-fixed-white">
        <img  className="bd-placeholder-img rounded me-2" 
    src="../../../assets/images/brand-logos/toggle-dark.png" alt="..."/>
        <strong  className="me-auto">Nowa</strong>
    </Toast.Header>
    <Toast.Body>
        Your,toast message here.
    </Toast.Body>
</Toast>
<Toast id="warningToast"  className="toast colored-toast bg-warning-transparent" 
role="alert" aria-live="assertive"
onClose={() => setShow3(false)} show={show3} delay={3000} autohide
    aria-atomic="true">
    <Toast.Header  className="toast-header bg-warning text-fixed-white">
        <img  className="bd-placeholder-img rounded me-2" 
    src="../../../assets/images/brand-logos/toggle-dark.png" alt="..."/>
        <strong  className="me-auto">Nowa</strong>
    </Toast.Header>
    <Toast.Body>
        Your,toast message here.
    </Toast.Body>
</Toast>
<Toast id="infoToast"  className="toast colored-toast bg-info-transparent" 
role="alert" aria-live="assertive"
 onClose={() => setShow4(false)} show={show4} delay={3000} autohide
    aria-atomic="true">
    <Toast.Header  className="bg-info text-fixed-white">
        <img  className="bd-placeholder-img rounded me-2" 
    src="../../../assets/images/brand-logos/toggle-dark.png" alt="..."/>
        <strong  className="me-auto">Nowa</strong>
    </Toast.Header>
    <Toast.Body>
        Your,toast message here.
    </Toast.Body>
</Toast>
<Toast id="successToast"  className="toast colored-toast bg-success-transparent" 
role="alert" aria-live="assertive"
onClose={() => setShow5(false)} show={show5} delay={3000} autohide
    aria-atomic="true">
    <Toast.Header  className="bg-success text-fixed-white">
        <img  className="bd-placeholder-img rounded me-2" 
    src="../../../assets/images/brand-logos/toggle-dark.png" alt="..."/>
        <strong  className="me-auto">Nowa</strong>
    </Toast.Header>
    <Toast.Body>
        Your,toast message here.
    </Toast.Body>
</Toast>
<Toast id="dangerToast"  className="toast colored-toast bg-danger-transparent" 
role="alert" aria-live="assertive"
 onClose={() => setShow6(false)} show={show6} delay={3000} autohide
    aria-atomic="true">
    <Toast.Header  className="toast-header bg-danger text-fixed-white">
        <img  className="bd-placeholder-img rounded me-2" 
    src="../../../assets/images/brand-logos/toggle-dark.png" alt="..."/>
        <strong  className="me-auto">Nowa</strong>
    </Toast.Header>
    <Toast.Body  className="toast-body">
        Your,toast message here.
    </Toast.Body>
</Toast>`;

export const toast3 = `<ToastContainer  className="toast-container position-fixed top-0 end-0 p-3">
<Toast id="solid-primaryToast"  className="toast colored-toast bg-primary text-fixed-white"
  onClose={() => setShow7(false)} show={show7} delay={3000} autohide>
    <Toast.Header  className="toast-header bg-primary text-fixed-white">
        <img  className="bd-placeholder-img rounded me-2" 
    src="../../../assets/images/brand-logos/toggle-dark.png" alt="..."/>
        <strong  className="me-auto">Nowa</strong>
    </Toast.Header>
    <Toast.Body>
        Your,toast message here.
    </Toast.Body>
</Toast>
<Toast id="solid-secondaryToast"  className="toast colored-toast bg-secondary text-fixed-white"  
onClose={() => setShow8(false)} show={show8} delay={3000} autohide
    aria-atomic="true">
    <Toast.Header  className="toast-header bg-secondary text-fixed-white">
        <img  className="bd-placeholder-img rounded me-2" 
    src="../../../assets/images/brand-logos/toggle-dark.png" alt="..."/>
        <strong  className="me-auto">Nowa</strong>
    </Toast.Header>
    <Toast.Body>
        Your,toast message here.
    </Toast.Body>
</Toast>
<Toast id="solid-warningToast"  className="toast colored-toast bg-warning text-fixed-white"  
onClose={() => setShow9(false)} show={show9} delay={3000} autohide>
    <Toast.Header  className="toast-header bg-warning text-fixed-white">
        <img  className="bd-placeholder-img rounded me-2" 
    src="../../../assets/images/brand-logos/toggle-dark.png" alt="..."/>
        <strong  className="me-auto">Nowa</strong>
    </Toast.Header>
    <Toast.Body>
        Your,toast message here.
    </Toast.Body>
</Toast>
<Toast id="solid-infoToast"  className="toast colored-toast bg-info text-fixed-white" 
onClose={() => setShow10(false)} show={show10} delay={3000} autohide>
    <Toast.Header  className="toast-header bg-info text-fixed-white">
        <img  className="bd-placeholder-img rounded me-2" 
    src="../../../assets/images/brand-logos/toggle-dark.png" alt="..."/>
        <strong  className="me-auto">Nowa</strong>
    </Toast.Header>
    <Toast.Body>
        Your,toast message here.
    </Toast.Body>
</Toast>
<Toast id="solid-successToast"  className="toast colored-toast bg-success text-fixed-white" 
onClose={() => setShow11(false)} show={show11} delay={3000} autohide>
    <Toast.Header  className="toast-header bg-success text-fixed-white">
        <img  className="bd-placeholder-img rounded me-2" 
    src="../../../assets/images/brand-logos/toggle-dark.png" alt="..."/>
        <strong  className="me-auto">Nowa</strong>
    </Toast.Header>
    <Toast.Body>
        Your,toast message here.
    </Toast.Body>
</Toast>
<Toast id="solid-dangerToast"  className="toast colored-toast bg-danger text-fixed-white"
 onClose={() => setShow12(false)} show={show12} delay={3000} autohide>
    <Toast.Header  className="toast-header bg-danger text-fixed-white">
        <img  className="bd-placeholder-img rounded me-2" 
    src="../../../assets/images/brand-logos/toggle-dark.png" alt="..."/>
        <strong  className="me-auto">Nowa</strong>
    </Toast.Header>
    <Toast.Body>
        Your,toast message here.
    </Toast.Body>
</Toast>
</ToastContainer>`;

export const toast4 = `  <Button type="button"  className="btn btn-primary btn-wave" id="liveToastBtn" onClick={() => setShow(true)}>Show live
toast</Button>
<Toast  className="toast-container position-fixed top-0 end-0 p-3" onClose={() => setShow(false)} show={show} delay={3000} autohide>
    <Toast.Header  className="toast-header text-default">
        <img  className="bd-placeholder-img rounded me-2" src="../../../assets/images/brand-logos/fav.ico" alt="..."/>
        <strong  className="me-auto">Nowa</strong>
        <small>11 mins ago</small>
    </Toast.Header>
    <Toast.Body  className="toast-body">
        Hello, world! This is a toast message.
    </Toast.Body>
</Toast>`;

export const toast5 = `<Toast  className="toast align-items-center text-bg-primary border-0 fade show mb-4"  show={showC}>
<div  className="d-flex">
<Toast.Body  className=" text-fixed-white" >
Hello, world! This is a toast message.</Toast.Body>
<CloseButton aria-label="Close" variant='' 
 className="btn-close btn-close-white me-2 m-auto"
 onClick={toggleShowC}></CloseButton>
 </div></Toast>
 
<Toast  className="toast align-items-center text-bg-secondary border-0 fade show mb-4"  show={showC}>
<div  className="d-flex">
<Toast.Body  className=" text-fixed-white" >
Hello, world! This is a toast message. </Toast.Body>
<CloseButton aria-label="Close" variant='' 
 className="btn-close btn-close-white me-2 m-auto" 
onClick={toggleShowC}></CloseButton>
 </div></Toast>

<Toast  className="toast align-items-center text-bg-success border-0 fade show mb-4"  show={showC}>
<div  className="d-flex">
<Toast.Body  className=" text-fixed-white" >
Hello, world! This is a toast message. </Toast.Body>
<CloseButton aria-label="Close" variant=''
  className="btn-close btn-close-white me-2 m-auto"
  onClick={toggleShowC}></CloseButton>
 </div></Toast>

<Toast  className="toast align-items-center text-bg-info border-0 fade show mb-4"  show={showC}>
<div  className="d-flex">
<Toast.Body  className=" text-fixed-white" >
Hello, world! This is a toast message. </Toast.Body>
<CloseButton aria-label="Close" variant='' 
 className="btn-close btn-close-white me-2 m-auto"
 onClick={toggleShowC}></CloseButton>
 </div></Toast>`;

export const toast6 = `<Toast show={showA} onClose={toggleShowA}  className="toast show"
role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false">
 <Toast.Header>
            <img src="../../../assets/images/brand-logos/fav.ico" alt=""  className="me-2" height="18" />
 <strong  className="me-auto">Nowa</strong>
 <small>11 mins ago</small>
 </Toast.Header>
 <Toast.Body> Hello, world! This is a toast message.</Toast.Body>
</Toast>`;

export const toast7 = `<ToastContainer  className="toast-container position-static">
<Toast show={showG} onClose={toggleShowG}  className="toast fade show">
    <Toast.Header  className="toast-header text-default">
        <img src="../../../assets/images/brand-logos/fav.ico" alt=""  className="me-2" height="18" />
        <strong  className="me-auto">Nowa</strong>
        <small>just now</small>
    </Toast.Header>
    <Toast.Body> See? Just like this.</Toast.Body>
</Toast>
<Toast show={showH} onClose={toggleShowH}  className="toast fade show">
    <Toast.Header  className="toast-header text-default">
        <img src="../../../assets/images/brand-logos/fav.ico" alt=""  className="me-2" height="18" />
        <strong  className="me-auto">Nowa</strong>
        <small>2 seconds ago</small>
    </Toast.Header>
    <Toast.Body> Heads up, toasts will stack automatically</Toast.Body>
</Toast>
</ToastContainer>`;

export const toast8 = `<Toast show={showA} onClose={toggleShowA}  className="toast show"
role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false">
 <Toast.Header>
            <img src="../../../assets/images/brand-logos/fav.ico" alt=""  className="me-2" height="18" />
 <strong  className="me-auto">Nowa</strong>
 <small>11 mins ago</small>
 </Toast.Header>
 <Toast.Body> Hello, world! This is a toast message.</Toast.Body>
</Toast>`;

export const toast9 = `<Toast role="alert" 
 className="toast align-items-center fade show mb-3" show={showI}>
<div  className="d-flex">
<Toast.Body  className="text-dark">Hello, world! This is a toast message.
</Toast.Body>
   <CloseButton type="button"  className="btn-close me-2 m-auto" 
    onClick={toggleShowI}>
   </CloseButton>
</div>
</Toast>
<div>
<span  className="my-4 text-muted">
   Alternatively, you can also add additional controls and admin to
   toasts.
</span>
</div>
<Toast  className="toast fade show mt-2" show={showJ}>
<Toast.Body>
   Hello, world! This is a toast message.
<div  className="mt-2 pt-2 border-top">
<Button type="button"   className="btn btn-primary btn-sm btn-wave">Take
 action</Button>
 <Button type="button"  className="btn btn-secondary btn-sm btn-wave" 
 onClick={toggleShowJ}>Close</Button>
 </div>
</Toast.Body>
</Toast>`;

export const toast10 = `<div  className="bd-example bg-light bd-example-toasts d-flex p-0 px-3">
<div aria-live="polite" aria-atomic="true"
     className="d-flex justify-content-center align-items-center w-100">
    <Toast show={showK} onClose={toggleShowK}  className="toast fade show shadow-lg">
        <Toast.Header  className="text-default">
            <img src="../../../assets/images/brand-logos/fav.ico" alt=""  className="bd-placeholder-img rounded me-2" />
            <strong  className="me-auto">Nowa</strong>
            <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body> Hello, world! This is a toast message.</Toast.Body>
    </Toast>
</div>
</div>`;
/*------ Toasts (prism-code for showcode purpose) end ------*/

/*------ typography (prism-code for showcode purpose) start ------*/
export const typography1 = `<h1  className="mb-3">h1. Bootstrap heading</h1>
<h2  className="mb-3">h2. Bootstrap heading</h2>
<h3  className="mb-3">h3. Bootstrap heading</h3>
<h4  className="mb-3">h4. Bootstrap heading</h4>
<h5  className="mb-3">h5. Bootstrap heading</h5>
<h6  className="mb-0">h6. Bootstrap heading</h6>`;

export const typography2 = `<p  className="h1 mb-3">h1. Bootstrap heading</p>
<p  className="h2 mb-3">h2. Bootstrap heading</p>
<p  className="h3 mb-3">h3. Bootstrap heading</p>
<p  className="h4 mb-3">h4. Bootstrap heading</p>
<p  className="h5 mb-3">h5. Bootstrap heading</p>
<p  className="h6 mb-0">h6. Bootstrap heading</p>`;

export const typography3 = `<h1  className="display-1">Display 1</h1>
<h1  className="display-2">Display 2</h1>
<h1  className="display-3">Display 3</h1>
<h1  className="display-4">Display 4</h1>
<h1  className="display-5">Display 5</h1>
<h1  className="display-6">Display 6</h1>`;

export const typography4 = `<h3>
Fancy display heading
<small  className="text-muted">With faded secondary text</small>
 </h3>`;

export const typography5 = `<p>You can use the mark tag to <mark>highlight</mark> text.</p>
<p><del>This line of text is meant to be treated as deleted text.</del>
</p>
<p><s>This line of text is meant to be treated as no longer
        accurate.</s>
</p>
<p><ins>This line of text is meant to be treated as an addition to the
        document.</ins></p>
<p><u>This line of text will render as underlined.</u></p>
<p><small>This line of text is meant to be treated as fine
        print.</small>
</p>
<p><strong>This line rendered as bold text.</strong></p>
<p  className="mb-0"><em>This line rendered as italicized text.</em></p>`;

export const typography6 = `<p  className="fs-1 mb-2">.fs-1 text</p>
<p  className="fs-2 mb-2">.fs-2 text</p>
<p  className="fs-3 mb-2">.fs-3 text</p>
<p  className="fs-4 mb-2">.fs-4 text</p>
<p  className="fs-5 mb-2">.fs-5 text</p>
<p  className="fs-6 mb-0">.fs-6 text</p>`;

export const typography7 = `<p  className="lead mb-0">
<b>This is a lead paragraph. It stands out from regular paragraphs</b>.There are many variations of passages of Lorem Ipsum available,
 but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
  If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.
</p>`;

export const typography8 = `<dl  className="row mb-0">
<dt  className="col-sm-3">Description lists</dt>
<dd  className="col-sm-9">A description list is perfect for defining terms.</dd>

<dt  className="col-sm-3">Term</dt>
<dd  className="col-sm-9">
    <p>Definition for the term.</p>
    <p>And some more placeholder definition text.</p>
</dd>

<dt  className="col-sm-3">Another term</dt>
<dd  className="col-sm-9">This definition is short, so no extra paragraphs or
    anything.</dd>

<dt  className="col-sm-3 text-truncate">Truncated term is truncated</dt>
<dd  className="col-sm-9">This can be useful when space is tight. Adds an
    ellipsis at
    the end.</dd>

<dt  className="col-sm-3">Nesting</dt>
<dd  className="col-sm-9 mb-0">
    <dl  className="row mb-0">
        <dt  className="col-sm-4">Nested definition list</dt>
        <dd  className="col-sm-8 mb-0">I heard you like definition lists. Let me put a
            definition list inside your definition list.</dd>
    </dl>
</dd></dl>`;

export const typography9 = `<ul  className="list-unstyled">
<li>This is a list.</li>
<li>It appears completely unstyled.</li>
<li>Structurally, it's still a list.</li>
<li>However, this style only applies to immediate child elements.</li>
<li  className="mb-2">Nested lists:
    <ul>
        <li>are unaffected by this style</li>
        <li>will still show a bullet</li>
        <li>and have appropriate left margin</li>
    </ul>
</li>
<li>This may still come in handy in some situations.</li>
</ul>`;

export const typography10 = `<figure  className="blockquote-container">
<blockquote  className="blockquote mb-2">
    <h6>The greatest glory in living lies not in never falling, but in rising every time we fall.</h6>
</blockquote>
<figcaption  className="blockquote-footer mt-0 mb-0 text-muted op-7"><cite title="Source Title">Nelson Mandela</cite>
</figcaption> </figure>`;

export const typography11 = `<figure  className="blockquote-container text-end">
<blockquote  className="blockquote mb-2">
    <h6>The greatest glory in living lies not in never falling, but in rising every time we fall.</h6>
</blockquote>
<figcaption  className="blockquote-footer mt-0 mb-0 text-muted op-7"><cite title="Source Title">Nelson Mandela</cite>
</figcaption></figure>`;

export const typography12 = `<blockquote  className="blockquote custom-blockquote primary mb-0 text-center">
<h6>The future belongs to those who believe in the beauty of their dreams..</h6>
<footer  className="blockquote-footer mt-3 fs-14 text-muted op-7 mb-0">Someone famous as <cite title="Source Title">-Eleanor Roosevelt</cite></footer>
<span  className="quote-icon"><i  className="ri-information-line"></i></span></blockquote>`;

export const typography13 = `<blockquote  className="blockquote custom-blockquote secondary mb-0 text-center">
<h6>The future belongs to those who believe in the beauty of their dreams..</h6>
<footer  className="blockquote-footer mt-3 fs-14 text-muted op-7 mb-0">Someone famous as <cite title="Source Title">-Eleanor Roosevelt</cite></footer>
<span  className="quote-icon"><i  className="ri-information-line"></i></span>
</blockquote>`;

export const typography14 = `<blockquote  className="blockquote custom-blockquote warning mb-0 text-center">
<h6>The future belongs to those who believe in the beauty of their dreams..</h6>
<footer  className="blockquote-footer mt-3 fs-14 text-muted op-7 mb-0">Someone famous as <cite title="Source Title">-Eleanor Roosevelt</cite></footer>
<span  className="quote-icon"><i  className="ri-information-line"></i></span>`;

export const typography15 = `<blockquote  className="blockquote custom-blockquote success mb-0 text-center">
<h6>The future belongs to those who believe in the beauty of their dreams..</h6>
<footer  className="blockquote-footer mt-3 fs-14 text-muted op-7 mb-0">Someone famous as <cite title="Source Title">-Eleanor Roosevelt</cite></footer>
<span  className="quote-icon"><i  className="ri-information-line"></i></span>
</blockquote>`;

export const typography16 = `<blockquote  className="blockquote custom-blockquote info mb-0 text-center">
<h6>The future belongs to those who believe in the beauty of their dreams..</h6>
<footer  className="blockquote-footer mt-3 fs-14 text-muted op-7 mb-0">Someone famous as <cite title="Source Title">-Eleanor Roosevelt</cite></footer>
<span  className="quote-icon"><i  className="ri-information-line"></i></span>
</blockquote>`;

export const typography17 = `<blockquote  className="blockquote custom-blockquote danger mb-0 text-center">
<h6>The future belongs to those who believe in the beauty of their dreams..</h6>
<footer  className="blockquote-footer mt-3 fs-14 text-muted op-7 mb-0">Someone famous as <cite title="Source Title">-Eleanor Roosevelt</cite></footer>
<span  className="quote-icon"><i  className="ri-information-line"></i></span>
</blockquote>`;

export const typography18 = `<p><abbr title="attribute">attr</abbr></p>
<p  className="mb-0"><abbr title="HyperText Markup Language"  className="initialism">HTML</abbr></p>`;

export const typography19 = `<ul  className="list-inline mb-0">
<li  className="list-inline-item">This is a list item.</li>
<li  className="list-inline-item">And another one.</li>
<li  className="list-inline-item">But they're displayed inline.</li>
</ul>`;

export const typography20 = `<p  className="mb-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
Rerum dolorem fuga iste obcaecati natus eos officiis adipisci voluptatibus ipsum, 
architecto veniam delectus vel dolor magni a vero sunt ut harum.</p>
<div  className="text-success">
    <hr/>
</div>
<p  className=" mb-1">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto perspiciatis, 
magni numquam quos perferendis nulla magnam odit amet excepturi quisquam provident.</p>
<hr  className="text-danger border-2 opacity-50"/>
<p  className="mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus aliquid consequatur
 aut doloremque assumenda voluptatem, id qui vero adipisci! Nostrum ipsam praesentium!</p>
<hr  className="border-primary border-3 opacity-75"/>`;

export const typography21 =
    '<p  class="font-monospace mb-0">This is in monospace</p>';

export const typography22 = `<p  className="text-muted mb-0">
Muted text with a <a href="#!"  className="text-reset text-decoration-underline text-dark">reset link</a>.
</p>`;

export const typography23 = '<p  class="visible mb-0">This is visible text</p>';

export const typography24 =
    '<p  class="invisible mb-0">This is invisible text</p>';

export const typography25 = `<p  className="text-lowercase">Lowercased text.</p>
<p  className="text-uppercase">Uppercased text.</p>
<p  className="text-capitalize mb-0">CapiTaliZed text.</p>`;

export const typography26 = `<p  className="text-decoration-underline">This text has a line underneath it.
</p>
<p  className="text-decoration-line-through">This text has a line going
    through
    it.
</p>
<Link to="#"  className="text-decoration-none">This link has its text
    decoration
    removed
</Link>`;

export const typography27 = `<p  className="fw-bold">Bold text.</p>
<p  className="fw-bolder">Bolder weight text (relative to the parent element).</p>
<p  className="fw-semibold">Semibold weight text.</p>
<p  className="fw-normal">Normal weight text.</p>
<p  className="fw-light">Light weight text.</p>
<p  className="fw-lighter">Lighter weight text (relative to the parent element).</p>
<p  className="fst-italic">Italic text.</p>
<p  className="fst-normal mb-0">Text with normal font style</p>`;

export const typography28 = `<p  className="lh-1">This is a long paragraph written to show how the line-height of
an
element is affected by our utilities. Classes are applied to the element
itself
or sometimes the parent element. These classes can be customized as needed
with
our utility API.
</p>
<p  className="lh-sm">This is a long paragraph written to show how the line-height of
an
element is affected by our utilities. Classes are applied to the element
itself
or sometimes the parent element. These classes can be customized as needed
with
our utility API.
</p>
<p  className="lh-base">This is a long paragraph written to show how the line-height
of
an element is affected by our utilities. Classes are applied to the element
itself or sometimes the parent element. These classes can be customized as
needed with our utility API.
</p>
<p  className="lh-lg mb-0">This is a long paragraph written to show how the
line-height
of an
element is affected by our utilities. Classes are applied to the element
itself
or sometimes the parent element. These classes can be customized as needed
with
our utility API.
</p>`;

export const typography29 = `<p  className="text-start">Start aligned text on all viewport sizes.</p>
<p  className="text-center">Center aligned text on all viewport sizes.</p>
<p  className="text-end">End aligned text on all viewport sizes.</p>

<p  className="text-sm-start">Start aligned text on viewports sized SM (small) or
    wider.
</p>
<p  className="text-md-start">Start aligned text on viewports sized MD (medium) or
    wider.
</p>
<p  className="text-lg-start">Start aligned text on viewports sized LG (large) or
    wider.
</p>
<p  className="text-xl-start">Start aligned text on viewports sized XL (extra-large)
    or
    wider.</p>`;

export const typography30 = `<div  className="badge bg-primary text-wrap mb-3" style={{width: "6rem"}}>
This text should wrap.
</div>
<p  className="text-muted mb-2"> use class <code>.text-nowrap</code> to prevent text from wrapping</p>
<div  className="text-nowrap bg-light border" style={{width: "8rem"}}>
This text should overflow the parent.
</div>`;

export const typography31 = `<p  className="text-break mb-0">
mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
 </p>`;
/*------ typography (prism-code for showcode purpose) end ------*/
