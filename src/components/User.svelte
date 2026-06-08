<script lang="ts">
  import type { Column, TableAction } from "$lib/ts/components";
  import DataTable from "./layouts/DataTable.svelte";
  import DeleteIcon from "./primitives/icons/deleteIcon.svelte";
  import SearchIcon from "./primitives/icons/searchIcon.svelte";



	interface User {
		id: number
		name: string
		email: string
		role: string
	}

	const users: User[] = [
		{ id:1, name:"Matt", email:"matt@mail.com", role:"Admin" },
		{ id:2, name:"Jane", email:"jane@mail.com", role:"User" }
	]

	const columns  : Column<User>[]= [
		{ key:"id", header:"ID" },
		{ key:"name", header:"Name" },
		{ key:"email", header:"Email" },
		{ key:"role", header:"Role" }
	]

	const actions : TableAction<User>[]= [
		{
			icon: SearchIcon,
			label:"View",
			onClick:(row)=>console.log("view",row)
		},
		// {
		// 	icon: ,
		// 	label:"Edit",
		// 	onClick:(row)=>console.log("edit",row)
		// },
		{
			icon: DeleteIcon,
			label:"Delete",
			onClick:(row)=>console.log("delete",row)
		}
	]
</script>

<DataTable
	data={users}
	{columns}
	{actions}
/>