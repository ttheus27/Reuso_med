/*------ tables(prism-code for showcode purpose) start ------*/
export const table1 = ` <div className="table-responsive">
<Table className="table text-nowrap">
    <thead>
        <tr>
            <th scope="col">Name</th>
            <th scope="col">Created On</th>
            <th scope="col">Number</th>
            <th scope="col">Status</th>
        </tr>
    </thead>
    <tbody>
        <tr>
<th scope="row">John</th>
<td>21,Dec 2023</td>
<td>+1234-12340</td>
<td><Badge className="bg-primary-transparent">
Completed</Badge></td>
        </tr>
        <tr>
<th scope="row">Vareni</th>
<td>29,April 2023</td>
<td>+1523-12459</td>
<td><Badge className="bg-secondary-transparent">
Failed</Badge></td>
        </tr>
        <tr>
<th scope="row">Sasra</th>
<td>30,Nov 2023</td>
<td>+1982-16234</td>
<td><Badge className="bg-success-transparent">
Successful</Badge></td>
        </tr>
        <tr>
<th scope="row">Widoyi</th>
<td>18,Mar 2023</td>
<td>+1526-10729</td>
<td><Badge className="bg-warning-transparent">
Pending</Badge></td>
        </tr>
        <tr>
<th scope="row">Rocky</th>
<td>30,Nov 2023</td>
<td>+1982-16234</td>
<td><Badge className="bg-success-transparent">
Successful</Badge></td>
        </tr>
    </tbody>
</Table>
</div>`;

export const table2 = ` <Table className="table text-nowrap table-bordered">
<thead>
 <tr>
     <th scope="col">User</th>
     <th scope="col">Status</th>
     <th scope="col">Email</th>
     <th scope="col">Action</th>
 </tr>
</thead>
<tbody>
 <tr>
     <th scope="row">
         <div className="d-flex align-items-center">
             <span className="avatar avatar-xs me-2 online avatar-rounded">
                 <img src="../../../assets/images/faces/13.jpg" alt="img"/>
             </span>Sukuro Kim
         </div>
     </th>
     <td><span className="badge bg-success-transparent">Active</span></td>
     <td>kimosukuro@gmail.com</td>
     <td>
         <div className="hstack gap-2 flex-wrap">
             <Link to="#" className="text-info fs-14 lh-1"><i
                     className="ri-edit-line"></i></Link>
             <Link to="#" className="text-danger fs-14 lh-1"><i
                     className="ri-delete-bin-5-line"></i></Link>
         </div>
     </td>
 </tr>
 <tr>
     <th scope="row">
         <div className="d-flex align-items-center">
             <span className="avatar avatar-xs me-2 offline avatar-rounded">
                 <img src="../../../assets/images/faces/6.jpg" alt="img"/>
             </span>Hasimna
         </div>
     </th>
     <td><span className="badge bg-light text-dark">Inactive</span></td>
     <td>hasimna2132@gmail.com</td>
     <td>
         <div className="hstack gap-2 flex-wrap">
             <Link to="#" className="text-info fs-14 lh-1"><i
                     className="ri-edit-line"></i></Link>
             <Link to="#" className="text-danger fs-14 lh-1"><i
                     className="ri-delete-bin-5-line"></i></Link>
         </div>
     </td>
 </tr>
</tbody>
</Table>`;

export const table3 = `<Table striped className="table text-nowrap table-striped">
<thead>
    <tr>
     <th scope="col">ID</th>
     <th scope="col">Date</th>
     <th scope="col">Customer</th>
     <th scope="col">Action</th>
    </tr>
</thead>
<tbody>
    {Table2data.map((idx)=>(
    <tr key={Math.random()}>
        <th scope="row">{idx.order}</th>
        <td>{idx.date}</td>
        <td>{idx.name}</td>
        <td>
        <div className="hstack gap-2 fs-15">
        <a href="#!" className="btn btn-icon btn-sm btn-info-light rounded-pill"><i className="ri-edit-line"></i></a>
       <a href="#!" className="btn btn-icon btn-sm btn-danger-light rounded-pill"><i className="ri-delete-bin-line"></i></a>
   </div>
        </td>
    </tr>
    ))}
</tbody>
</Table>`;

export const table4 = ` <Table className="table text-nowrap table-striped-columns">
<thead>
    <tr>
        <th scope="col">ID</th>
        <th scope="col">Date</th>
        <th scope="col">Customer</th>
        <th scope="col">Action</th>
    </tr>
</thead>
<tbody>
    {Table2data.map((idx)=>(
    <tr key={Math.random()}>
        <th scope="row">{idx.order}</th>
        <td>{idx.date}</td>
        <td>{idx.name}</td>
        <td>
            <div className="hstack gap-2 fs-15">
                 <a href="#!" className="btn btn-icon btn-sm btn-info-light 
                 rounded-pill"><i className="ri-edit-line"></i></a>
                <a href="#!" className="btn btn-icon btn-sm btn-danger-light
                 rounded-pill"><i className="ri-delete-bin-line"></i></a>
            </div>
        </td>
    </tr>
    ))}
</tbody>
</Table>`;

export const table5 = `<Table className="table text-nowrap table-primary overflow-hidden rounded-3">
<thead>
    <tr>
        <th scope="col">#</th>
        <th scope="col">First</th>
        <th scope="col">Last</th>
        <th scope="col">Handle</th>
    </tr>
</thead>
<tbody>
    {Table3data.map((idx)=>(
    <tr key={Math.random()}>
        <th scope="row">1</th>
        <td>{idx.text1}</td>
        <td>{idx.text2}</td>
        <td>{idx.text3}</td>
    </tr>
    ))}
</tbody>
</Table>`;

export const table6 = `<Table className="table text-nowrap table-primary overflow-hidden rounded-3">
<thead>
    <tr>
        <th scope="col">#</th>
        <th scope="col">First</th>
        <th scope="col">Last</th>
        <th scope="col">Handle</th>
    </tr>
</thead>
<tbody>
    {Table3data.map((idx)=>(
    <tr key={Math.random()}>
        <th scope="row">1</th>
        <td>{idx.text1}</td>
        <td>{idx.text2}</td>
        <td>{idx.text3}</td>
    </tr>
    ))}
</tbody>
</Table>`;

export const table7 = `<Table className="table text-nowrap table-primary overflow-hidden rounded-3">
<thead>
    <tr>
        <th scope="col">#</th>
        <th scope="col">First</th>
        <th scope="col">Last</th>
        <th scope="col">Handle</th>
    </tr>
</thead>
<tbody>
    {Table3data.map((idx)=>(
    <tr key={Math.random()}>
        <th scope="row">1</th>
        <td>{idx.text1}</td>
        <td>{idx.text2}</td>
        <td>{idx.text3}</td>
    </tr>
    ))}
</tbody>
</Table>`;

export const table8 = ` <Table className="table text-nowrap table-primary overflow-hidden rounded-3">
<thead>
    <tr>
        <th scope="col">#</th>
        <th scope="col">First</th>
        <th scope="col">Last</th>
        <th scope="col">Handle</th>
    </tr>
</thead>
<tbody>
    {Table3data.map((idx)=>(
    <tr key={Math.random()}>
        <th scope="row">1</th>
        <td>{idx.text1}</td>
        <td>{idx.text2}</td>
        <td>{idx.text3}</td>
    </tr>
    ))}
</tbody>
</Table>`;

export const table9 = `<Table className="table text-nowrap table-primary overflow-hidden rounded-3">
<thead>
    <tr>
        <th scope="col">#</th>
        <th scope="col">First</th>
        <th scope="col">Last</th>
        <th scope="col">Handle</th>
    </tr>
</thead>
<tbody>
    {Table3data.map((idx)=>(
    <tr key={Math.random()}>
        <th scope="row">1</th>
        <td>{idx.text1}</td>
        <td>{idx.text2}</td>
        <td>{idx.text3}</td>
    </tr>
    ))}
</tbody>
</Table>`;

export const table10 = `<Table className="table text-nowrap table-primary overflow-hidden rounded-3">
<thead>
    <tr>
        <th scope="col">#</th>
        <th scope="col">First</th>
        <th scope="col">Last</th>
        <th scope="col">Handle</th>
    </tr>
</thead>
<tbody>
    {Table3data.map((idx)=>(
    <tr key={Math.random()}>
        <th scope="row">1</th>
        <td>{idx.text1}</td>
        <td>{idx.text2}</td>
        <td>{idx.text3}</td>
    </tr>
    ))}
</tbody>
</Table>`;

export const table11 = `<Table className="text-nowrap table-bordered border-primary">
<thead>
    <tr>
        <th scope="col">Order</th>
        <th scope="col">Date</th>
        <th scope="col">Customer</th>
        <th scope="col">Action</th>
    </tr>
</thead>
<tbody>
    {Table4data.map((idx)=>(
    <tr>
        <th scope="row">
            {idx.order}
        </th>
        <td>
            <span className="badge bg-light text-dark">{idx.date}</span>
        </td>
        <td>
            <div className="d-flex align-items-center">
                <span className="avatar avatar-xs me-2 online avatar-rounded">
                    <img src={idx.src} alt="img"/>
                </span>{idx.name}
            </div>
        </td>
        <td><span className="badge bg-primary-transparent">Booked</span></td>
    </tr>
    ))}

</tbody>
</Table>`;

export const table12 = `<Table className="text-nowrap table-bordered border-success">
<thead>
    <tr>
        <th scope="col">Order</th>
        <th scope="col">Date</th>
        <th scope="col">Customer</th>
        <th scope="col">Status</th>
    </tr>
</thead>
<tbody>
    {Table5data.map((idx)=>(
    <tr key={Math.random()}>
        <th scope="row">
            {idx.order}
        </th>
        <td>
            <span className="badge bg-light text-dark">{idx.date}</span>
        </td>
        <td>
            <div className="d-flex align-items-center">
                <span className="avatar avatar-xs me-2 online avatar-rounded">
                    <img src={idx.src} alt="img"/>
                </span>{idx.name}
            </div>
        </td>
        <td><span className="badge bg-success-transparent">Delivered</span></td>
    </tr>
    ))}
</tbody>
</Table>`;

export const table13 = `<Table className="table text-nowrap table-bordered border-warning">
<thead>
    <tr>
        <th scope="col">Order</th>
        <th scope="col">Date</th>
        <th scope="col">Customer</th>
        <th scope="col">Action</th>
    </tr>
</thead>
<tbody>
    {Table6data.map((idx)=>(
    <tr>
        <th scope="row">
            {idx.order}
        </th>
        <td>
            <span className="badge bg-light text-dark">{idx.date}</span>
        </td>
        <td>
            <div className="d-flex align-items-center">
                <span className="avatar avatar-xs me-2 online avatar-rounded">
                    <img src={idx.src} alt="img"/>
                </span>{idx.name}
            </div>
        </td>
        <td><span className="badge bg-warning-transparent">Accepted</span></td>
    </tr>
    ))}
</tbody>
</Table>`;

export const table14 = `<Table className="table text-nowrap table-borderless">
<thead>
    <tr>
        <th scope="col">User Name</th>
        <th scope="col">Transaction Id</th>
        <th scope="col">Created</th>
        <th scope="col">Status</th>
    </tr>
</thead>
<tbody>
    <tr>
        <th scope="row">Harshrath</th>
        <td>#5182-3467</td>
        <td>24 May 2022</td>
        <td><span className="badge bg-primary">Fixed</span></td>
    </tr>
    <tr>
        <th scope="row">Zozo Hadid</th>
        <td>#5182-3412</td>
        <td>02 July 2022</td>
        <td><span className="badge bg-warning">In Progress</span></td>
    </tr>
    <tr>
        <th scope="row">Martiana</th>
        <td>#5182-3423</td>
        <td>15 April 2022</td>
        <td><span className="badge bg-success">Completed</span></td>
    </tr>
    <tr>
        <th scope="row">Alex Carey</th>
        <td>#5182-3456</td>
        <td>17 March 2022</td>
        <td><span className="badge bg-danger">Pending</span></td>
    </tr>
</tbody>
</Table>`;

export const table15 = `<Table className="table text-nowrap">
<thead>
    <tr>
        <th scope="col">Product</th>
        <th scope="col">Seller</th>
        <th scope="col">Sale Percentage</th>
        <th scope="col">Qunatity Sold</th>
    </tr>
</thead>
<tbody className="table-group-divider">
    <tr>
        <th scope="row">Smart Watch</th>
        <td>Slowtrack.inc</td>
        <td><a href="#!" className="text-success">24.23%<i
                    className="ri-arrow-up-fill ms-1"></i></a></td>
        <td>250/1786</td>
    </tr>
    <tr>
        <th scope="row">White Sneakers</th>
        <td>American & Co.inc</td>
        <td><a href="#!" className="text-danger">12.45%<i
                    className="ri-arrow-down-fill ms-1"></i></a></td>
        <td>123/985</td>
    </tr>
    <tr>
        <th scope="row">Baseball Bat</th>
        <td>Sports Company</td>
        <td><a href="#!" className="text-success">06.64%<i
                    className="ri-arrow-up-fill ms-1"></i></a></td>
        <td>124/232</td>
    </tr>
    <tr>
        <th scope="row">Black Hoodie</th>
        <td>Renonds Fabrics</td>
        <td><a href="#!" className="text-success">14.42%<i
                    className="ri-arrow-up-fill ms-1"></i></a></td>
        <td>192/2456</td>
    </tr>
</tbody>
</Table>`;

export const table16 = `<Table className="table text-nowrap">
<thead className="table-primary">
    <tr>
        <th scope="col">User Name</th>
        <th scope="col">Transaction Id</th>
        <th scope="col">Created</th>
        <th scope="col">Status</th>
    </tr>
</thead>
<tbody>
    {Table7data.map((idx)=>(
    <tr key={Math.random()}>
        <th scope="row">{idx.name}</th>
        <td>{idx.text}</td>
        <td>{idx.date}</td>
        <td>
<div className="hstack gap-2 fs-15">
    <a href="#!"
        className="btn btn-icon btn-sm btn-success-light rounded-pill"><i
className="ri-download-2-line"></i></a>
    <a href="#!"
        className="btn btn-icon btn-sm btn-info-light rounded-pill"><i
className="ri-edit-line"></i></a>
    <a href="#!"
        className="btn btn-icon btn-sm btn-danger-light rounded-pill"><i
className="ri-delete-bin-line"></i></a>
</div>
        </td>
    </tr>
    ))}
</tbody>
</Table>`;

export const table17 = `<Table className="table text-nowrap">
<thead className="table-warning">
    <tr>
        <th scope="col">User Name</th>
        <th scope="col">Transaction Id</th>
        <th scope="col">Created</th>
        <th scope="col">Status</th>
    </tr>
</thead>
<tbody>
    {Table8data.map((idx)=>(
    <tr key={Math.random()}>
        <th scope="row">{idx.name}</th>
        <td>{idx.text}</td>
        <td>{idx.color}</td>
        <td>
            <Button variant={idx.color} className="btn-sm">{idx.btn}</Button>
        </td>
    </tr>
    ))}
</tbody>
</Table>`;

export const table18 = `<Table className="table text-nowrap">
<thead className="table-success">
    <tr>
        <th scope="col">User Name</th>
        <th scope="col">Transaction Id</th>
        <th scope="col">Created</th>
        <th scope="col">Status</th>
    </tr>
</thead>
<tbody>
    {Table8data.map((idx)=>(
    <tr key={Math.random()}>
        <th scope="row">{idx.name}</th>
        <td>{idx.text}</td>
        <td>{idx.color}</td>
        <td>
            <Button variant={idx.color} className="btn-sm">{idx.btn}</Button>
        </td>
    </tr>
    ))}
</tbody>
</Table>`;

export const table19 = `<Table className="table text-nowrap">
<thead className="table-info">
    <tr>
        <th scope="col">User Name</th>
        <th scope="col">Transaction Id</th>
        <th scope="col">Created</th>
        <th scope="col">Status</th>
    </tr>
</thead>
<tbody>
    {Table8data.map((idx)=>(
    <tr key={Math.random()}>
        <th scope="row">{idx.name}</th>
        <td>{idx.text}</td>
        <td>{idx.color}</td>
        <td>
            <Button variant={idx.color} className="btn-sm">{idx.btn}</Button>
        </td>
    </tr>
    ))}
</tbody>
</Table>`;

export const table20 = `<Table className="table text-nowrap">
<thead className="table-secondary">
    <tr>
        <th scope="col">User Name</th>
        <th scope="col">Transaction Id</th>
        <th scope="col">Created</th>
        <th scope="col">Status</th>
    </tr>
</thead>
<tbody>
    {Table8data.map((idx)=>(
    <tr key={Math.random()}>
        <th scope="row">{idx.name}</th>
        <td>{idx.text}</td>
        <td>{idx.color}</td>
        <td>
            <Button variant={idx.color} className="btn-sm">{idx.btn}</Button>
        </td>
    </tr>
    ))}
</tbody>
</Table>`;

export const table21 = ` <Table className="table text-nowrap">
<thead className="table-danger">
    <tr>
        <th scope="col">User Name</th>
        <th scope="col">Transaction Id</th>
        <th scope="col">Created</th>
        <th scope="col">Status</th>
    </tr>
</thead>
<tbody>
    {Table8data.map((idx)=>(
    <tr key={Math.random()}>
        <th scope="row">{idx.name}</th>
        <td>{idx.text}</td>
        <td>{idx.color}</td>
        <td>
            <Button variant={idx.color} className="btn-sm">{idx.btn}</Button>
        </td>
    </tr>
    ))}
</tbody>
</Table>`;

export const table22 = `<Table className="table text-nowrap table-hover">
<thead>
    <tr>
        <th scope="col">Product Manager</th>
        <th scope="col">Category</th>
        <th scope="col">Team</th>
        <th scope="col">Status</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>
            <div className="d-flex align-items-center">
                <div className="avatar avatar-sm me-2 avatar-rounded">
                    <img src="../../../assets/images/faces/10.jpg" alt="img"/>
                </div>
                <div>
                    <div className="lh-1">
                        <span>Joanna Smith</span>
                    </div>
                    <div className="lh-1">
                        <span
                            className="fs-11 text-muted">joannasmith14@gmail.com</span>
                    </div>
                </div>
            </div>
        </td>
        <td><span className="badge bg-primary-transparent">Fashion</span></td>
        <td>
            <div className="avatar-list-stacked">
                <span className="avatar avatar-sm avatar-rounded">
                    <img src="../../../assets/images/faces/2.jpg" alt="img"/>
                </span>
                <span className="avatar avatar-sm avatar-rounded">
                    <img src="../../../assets/images/faces/8.jpg" alt="img"/>
                </span>
                <span className="avatar avatar-sm avatar-rounded">
                    <img src="../../../assets/images/faces/2.jpg" alt="img"/>
                </span>
                <a className="avatar avatar-sm bg-primary text-fixed-white avatar-rounded"
                    href="#!">
                    +5
                </a>
            </div>
        </td>
        <td>
            <div className="progress progress-xs">
                <div className="progress-bar bg-primary" role="progressbar"
                    style={{width: "52%"}} aria-valuenow="52" aria-valuemin="0"
                    aria-valuemax="100">
                </div>
            </div>
        </td>
    </tr>  
</tbody>
</Table>`;

export const table23 = `<Table className="text-nowrap table-striped table-hover">
<thead>
    <tr>
        <th scope="col">Invoice</th>
        <th scope="col">Customer</th>
        <th scope="col">Status</th>
        <th scope="col">Date</th>
    </tr>
</thead>
<tbody>
    {Table13data.map((idx)=>(
    <tr key={Math.random()}>
        <th scope="row">{idx.text1}</th>
        <td>
            <div className="d-flex align-items-center">
                <div className="avatar avatar-sm me-2 avatar-rounded">
                    <img src={idx.src} alt="img"/>
                </div>
                <div>
                    <div className="lh-1">
                        <span>{idx.name}</span>
                    </div>
                    <div className="lh-1">
                        <span
                            className="fs-11 text-muted">{idx.mail}</span>
                    </div>
                </div>
            </div>
        </td>
        <td><Badge bg={idx.color} className={badge {idx.class}}><i
                    className={ri-{idx.icon} align-middle me-1}>
                    </i>{idx.text2}</Badge></td>
        <td>{idx.date}</td>
    </tr>
    ))}
</tbody>
</Table>`;

export const table24 = ` <Table className="table text-nowrap">
<thead>
    <tr>
        <th scope="col">Name</th>
        <th scope="col">Created On</th>
        <th scope="col">Number</th>
        <th scope="col">Status</th>
    </tr>
</thead>
<tbody>
    <tr className="table-active">
        <th scope="row">Mark</th>
        <td>21,Dec 2021</td>
        <td>+1234-12340</td>
        <td><span className="badge bg-primary">Completed</span></td>
    </tr>
    <tr>
        <th scope="row">Monika</th>
        <td>29,April 2022</td>
        <td>+1523-12459</td>
        <td><span className="badge bg-warning">Failed</span></td>
    </tr>
    <tr>
        <th scope="row">Madina</th>
        <td>30,Nov 2022</td>
        <td className="table-active">+1982-16234</td>
        <td><span className="badge bg-success">Successful</span></td>
    </tr>
    <tr>
        <th scope="row">Bhamako</th>
        <td>18,Mar 2022</td>
        <td>+1526-10729</td>
        <td><span className="badge bg-secondary">Pending</span></td>
    </tr>
</tbody>
 </Table>`;

export const table25 = `<Table className="table text-nowrap table-sm">
<thead>
    <tr>
        <th scope="col">Invoice</th>
        <th scope="col">Created Date</th>
        <th scope="col">Status</th>
        <th scope="col">Action</th>
    </tr>
</thead>
<tbody>
    {Table9data.map((idx)=>(
    <tr key={Math.random()}>
        <th scope="row">
            <div className="form-check">
            <Form.Check id={idx.id} className="" type="checkbox" value="" />
                <Form.Label className="" htmlFor="checkebox-sm">
                    {idx.name}
                </Form.Label>
            </div>
        </th>  
        <td>{idx.date}</td>
        <td><Badge bg={idx.class} className="badge 
        bg-success-transparent">{idx.text}</Badge></td>
        <td>
            <div className="hstack gap-2 fs-15">
                <a href="#!" className="btn btn-icon btn-sm
                 btn-light"><i className="ri-download-2-line"></i></a>
                <a href="#!" className="btn btn-icon btn-sm 
                btn-light"><i className="ri-edit-line"></i></a>
            </div>
        </td>
    </tr>
    ))}
</tbody>
</Table>`;

export const table26 = `<Table className="table text-nowrap table-sm">
<thead>
    <tr>
        <th scope="col">Invoice</th>
        <th scope="col">Created Date</th>
        <th scope="col">Status</th>
        <th scope="col">Action</th>
    </tr>
</thead>
<tbody>
    {Table9data.map((idx)=>(
    <tr key={Math.random()}>
        <th scope="row">
            <div className="form-check">
            <Form.Check id={idx.id} className="" type="checkbox" value="" />
                <Form.Label className="" htmlFor="checkebox-sm">
                    {idx.name}
                </Form.Label>
            </div>
        </th>  
        <td>{idx.date}</td>
        <td><Badge bg={idx.class} className="badge 
        bg-success-transparent">{idx.text}</Badge></td>
        <td>
            <div className="hstack gap-2 fs-15">
                <a href="#!" className="btn btn-icon btn-sm
                 btn-light"><i className="ri-download-2-line"></i></a>
                <a href="#!" className="btn btn-icon btn-sm 
                btn-light"><i className="ri-edit-line"></i></a>
            </div>
        </td>
    </tr>
    ))}
</tbody>
</Table>`;

export const table27 = `<Table className="table text-nowrap">
<caption className="px-3">Top 3 Countries</caption>
<thead>
    <tr>
        <th scope="col">S.No</th>
        <th scope="col">Country</th>
        <th scope="col">Medals Won</th>
        <th scope="col">No Of Athletes</th>
    </tr>
</thead>
<tbody>
    <tr>
        <th scope="row">01</th>
        <td>United States</td>
        <td>2012<i className="ri-medal-line mx-2"></i></td>
        <td>1823</td>
    </tr>
    <tr>
        <th scope="row">02</th>
        <td>United Kingdom</td>
        <td>1012<i className="ri-medal-line mx-2"></i></td>
        <td>992</td>
    </tr>
    <tr>
        <th scope="row">03</th>
        <td>Germany</td>
        <td>914<i className="ri-medal-line mx-2"></i></td>
        <td>875</td>
    </tr>
</tbody>
</Table>`;

export const table28 = `<Table className="table text-nowrap caption-top">
<caption className="px-2">Top IT Companies</caption>
<thead>
    <tr>
        <th scope="col">S.No</th>
        <th scope="col">Name</th>
        <th scope="col">Revenue</th>
        <th scope="col">Country</th>
    </tr>
</thead>
<tbody>
    <tr>
        <th scope="row">1</th>
        <td>Microsoft</td>
        <td>$170 billion</td>
        <td>United States</td>
    </tr>
    <tr>
        <th scope="row">2</th>
        <td>HP</td>
        <td>$72 billion</td>
        <td>United States</td>
    </tr>
    <tr>
        <th scope="row">3</th>
        <td>IBM</td>
        <td>$60 billion</td>
        <td>United States</td>
    </tr>
</tbody>
</Table>`;

export const table29 = `<Table className="table text-nowrap">
<thead>
    <tr>
        <th scope="col">Color</th>
        <th scope="col">Client</th>
        <th scope="col">State</th>
        <th scope="col">Quantity</th>
        <th scope="col">Total Price</th>
    </tr>
</thead>
<tbody>
    {Table11data.map((idx)=>(
    <tr key={Math.random()}>
        <th scope="row">{idx.text}</th>
        <td>{idx.name}</td>
        <td><Badge bg={idx.color} 
        className={badge {idx.class2}}>Processed</Badge></td>
        <td>{idx.quantity}</td>
        <td>{idx.price}</td>
    </tr>
    ))}
</tbody>
</Table>`;

export const table30 = `<Table className="table text-nowrap table-striped table-bordered">
<thead>
    <tr>
        <th scope="col">#</th>
        <th scope="col">First</th>
        <th scope="col">Last</th>
        <th scope="col">Handle</th>
    </tr>
</thead>
<tbody>
    <tr>
        <th scope="row">1</th>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
    </tr>
    <tr>
        <td colSpan="4">
            <table className="table text-nowrap mb-0">
                <thead>
                    <tr>
                        <th scope="col">Aplhabets</th>
                        <th scope="col">Users</th>
                        <th scope="col">Email</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">A</th>
                        <td>Dino King</td>
                        <td>dinoking231@gmail.com</td>
                    </tr>
                    <tr>
                        <th scope="row">B</th>
                        <td>Poppins sams</td>
                        <td>pops@gmail.com</td>
                    </tr>
                    <tr>
                        <th scope="row">C</th>
                        <td>Brian Shaw</td>
                        <td>swanbrian@gmail.com</td>
                    </tr>
                </tbody>
            </table>
        </td>
    </tr>
    <tr>
        <th scope="row">3</th>
        <td>Larry</td>
        <td>the Bird</td>
        <td>@twitter</td>
    </tr>
    <tr>
        <th scope="row">4</th>
        <td>Jimmy</td>
        <td>the Ostrich</td>
        <td>Dummy Text</td>
    </tr>
    <tr>
        <th scope="row">5</th>
        <td>Cobra Kai</td>
        <td>the Snake</td>
        <td>Another Name</td>
    </tr>
</tbody>
</Table>`;

export const table31 = ` <Table className="table text-nowrap">
<thead>
    <tr>
        <th scope="col"><input className="form-check-input" 
        type="checkbox" id="checkboxNoLabel" value="" aria-label="..."/></th>
        <th scope="col">Team Head</th>
        <th scope="col">Gmail</th>
        <th scope="col">Category</th>
        <th scope="col">Role</th>
        <th scope="col">Team</th>
        <th scope="col">Work Progress</th>
        <th scope="col">Revenue</th>
        <th scope="col">Action</th>
    </tr>
</thead>
<tbody>
    <tr>
        <th scope="row"><input className="form-check-input" type="checkbox" 
        id="checkboxNoLabel1" value="" aria-label="..."/></th>
        <td>
            <div className="d-flex align-items-center">
                <span className="avatar avatar-xs me-2 online avatar-rounded">
                    <img src="../../../assets/images/faces/3.jpg" alt="img"/>
                </span>Mayor Kelly
            </div>
        </td>
        <td>mayorkrlly@gmail.com</td>
        <td>Manufacturer</td>
        <td><span className="badge bg-primary-transparent">Team Lead</span></td>
        <td>
        <ProgressBar className="progress progress-xs" variant='primary' now={52} />
        </td>
        <td>$10,984.29</td>
        <td>
            <div className="avatar-list-stacked">
                <span className="avatar avatar-sm avatar-rounded">
                    <img src="../../../assets/images/faces/2.jpg" alt="img"/>
                </span>
                <span className="avatar avatar-sm avatar-rounded">
                    <img src="../../../assets/images/faces/8.jpg" alt="img"/>
                </span>
                <span className="avatar avatar-sm avatar-rounded">
                    <img src="../../../assets/images/faces/2.jpg" alt="img"/>
                </span>
                <a className="avatar avatar-sm bg-primary 
                text-fixed-white avatar-rounded" href="#!">
                    +4
                </a>
            </div>
        </td>
        <td>
            <div className="hstack gap-2 fs-15">
                <a href="#!" className="btn btn-icon btn-sm btn-success">
                <i className="ri-download-2-line"></i></a>
                <a href="#!" className="btn btn-icon btn-sm btn-info">
                <i className="ri-edit-line"></i></a>
            </div>
        </td>
    </tr>
</tbody>
</Table>`;

export const table32 = ` <Table className="table align-middle">
<thead>
    <tr>
        <th scope="col" className="w-25">Heading 1</th>
        <th scope="col" className="w-25">Heading 2</th>
        <th scope="col" className="w-25">Heading 3</th>
        <th scope="col" className="w-25">Heading 4</th>
    </tr>
</thead>
<tbody>
{Table12data.map((idx) => (
    <tr key={Math.random()} className={idx.class1}>
        <td>{idx.text1} <code>{idx.code1}</code> {idx.text2}</td>
        <td>{idx.text1} <code>{idx.code1}</code> {idx.text2}</td>
        <td className={idx.class2}>{idx.text3} <code>{idx.code2}</code> {idx.text4}</td>
        <td>This here is some placeholder text, intended to take up
            quite a
            bit of vertical space, to demonstrate how the vertical
            alignment
            works in the preceding cells.</td>
    </tr>
))}
</tbody>
</Table>`;
/*------ tables(prism-code for showcode purpose) end ------*/

