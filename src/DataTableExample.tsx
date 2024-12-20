import { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";
import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // Theme CSS
import "primereact/resources/primereact.min.css"; // Core CSS
import "primeicons/primeicons.css"; // PrimeIcons CSS
import { FaAngleDown } from "react-icons/fa";

interface IPosts {
  title?: string;
  place_of_origin?: string;
  artist_display?: string;
  inscriptions?: string;
  date_start?: number;
  date_end?: number;
}

const DataTableExample = () => {
  const [posts, setPosts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState<IPosts[] | null>(
    null
  );
  const [rowClick, setRowClick] = useState<boolean>(true);


  const overlayPanelRef = useRef(null);
  const [search, setSearch] = useState("");
  console.log(search);
  const [selectedRow, setSelectedRow] = useState(null);


  const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
  const paginatorRight = <Button type="button" icon="pi pi-download" text />;

  useEffect(() => {
    getData();
  }, []);

  const handleSearch = () => {
    console.log(`Search Term: ${search}`);
    console.log(`Selected Row: ${selectedRow}`);
    overlayPanelRef.current.hide();
};

  const getData = () => {
    axios
      .get<IPosts[]>("https://api.artic.edu/api/v1/artworks?page=1")
      .then((response) => {
        console.log(response);
        setPosts(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      },[]);
  };

  // const filter = (e) =>{
  //   setSearch(posts.filter(posts => posts.title.toLowerCase().includes(e.target.value)))
  // }

  return (
    <div>
      <div className="card flex justify-content-center">
        <FaAngleDown onClick={(e) => overlayPanelRef.current.toggle(e)} />
        <OverlayPanel ref={overlayPanelRef}>
          <div style={{ padding: "10px" }}>
            <div className="p-field">
              <InputText
                id="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search rows..."
                style={{ width: "100%" }}
              />
            </div>
          </div>

          <Button
            label="Submit"
            onClick={handleSearch}
            style={{ marginTop: "10px" }}
          />
        </OverlayPanel>

        <DataTable
          value={posts}
          selectionMode={rowClick ? undefined : 'multiple'}
          selection={selectedProducts!}
          onSelectionChange={(e) => setSelectedProducts(e.target.value)}
          dataKey="id"
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          tableStyle={{ minWidth: "50rem" }}
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
          paginatorLeft={paginatorLeft}
          paginatorRight={paginatorRight}
        >
          <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />
            <Column field="title" sortable header="title"/>
        <Column field="place_of_origin" sortable header="place_of_origin"/>
        <Column field="artist_display" sortable header="artist_display" />
        <Column field="inscriptions" sortable header="inscriptions" />
        <Column field="date_start" sortable header="date_start" />
        <Column field="date_end" sortable header="date_end" />
        </DataTable>
      </div>
    </div>
  );
};

export default DataTableExample;


