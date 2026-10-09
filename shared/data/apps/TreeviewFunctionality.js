import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";// icons
import { TreeItem } from "@mui/x-tree-view";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

export function BasicTreeviewexample1() {
	return (
		<SimpleTreeView
			aria-label="file system navigator"
			
		>
			<TreeItem itemId="1" label="TECH">
				<TreeItem itemId="2" label="Company Maintenance" />
				<TreeItem itemId="3" label="Employees" />
				<TreeItem itemId="4" label="Human Resources" />
			</TreeItem>
		</SimpleTreeView>
	);
}
export function BasicTreeviewexample2() {
	return (
		<SimpleTreeView
			aria-label="file system navigator"
			
		>
			<TreeItem itemId="5" label="XRP">
				<TreeItem itemId="6" label="Company Maintenance" />
				<TreeItem itemId="7" label="Employees">
					<TreeItem itemId="8" label="Company Maintenance-1" />

				</TreeItem>
				<TreeItem itemId="10" label="Employees-1">
					<TreeItem itemId="11" label="Company Maintenance-2" />
				</TreeItem>
				<TreeItem itemId="12" label="Employees" />
			</TreeItem>
		</SimpleTreeView>
	);
}

export function BasicTreeviewexample3() {
	return (
		<SimpleTreeView
			aria-label="file system navigator"

		>
			<TreeItem itemId="5" label="TECH 2">
				<TreeItem itemId="6" label="Company Maintenance" />
				<TreeItem itemId="7" label="Employees">
					<TreeItem itemId="8" label="Company Maintenance" />
					<TreeItem itemId="10" label="Employees">
						<TreeItem itemId="11" label="Human Resource" />
					</TreeItem>
				</TreeItem>
				<TreeItem itemId="12" label="Human Resource" />
			</TreeItem>
		</SimpleTreeView>
	);
}

export function BasicTreeviewexample4() {
	return (
		<SimpleTreeView
			aria-label="file system navigator"
		
		>
			<TreeItem itemId="5" label="TECH 3">
			</TreeItem>
		</SimpleTreeView>
	);
}
