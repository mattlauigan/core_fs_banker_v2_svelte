<script lang="ts">
  import type { Column, TableAction } from "$lib/ts/components";
  import TableGrid from "./layouts/TableGrid.svelte";
  import DataTable from "./layouts/TableGrid.svelte";
  import DeleteIcon from "./primitives/icons/deleteIcon.svelte";
  import SearchIcon from "./primitives/icons/searchIcon.svelte";



	interface User {
		id: number
		name: string
		email: string
		role: string
	}

	const users: User[] = [
		{ id:1, name:"Matt Lauigan", email:"matt@mail.com", role:"Admin"},
		{ id:2, name:"Jane", email:"jane@mail.com", role:"User" },
		{ id:3, name:"Matt Lauigan", email:"matt@mail.com", role:"Admin"},
		{ id:4, name:"Jane", email:"jane@mail.com", role:"User" },
		{ id:5, name:"Matt Lauigan", email:"matt@mail.com", role:"Admin"},
		{ id:6, name:"Jane", email:"jane@mail.com", role:"User" },
		{ id:7, name:"Matt Lauigan", email:"matt@mail.com", role:"Admin"},
		{ id:8, name:"Jane", email:"jane@mail.com", role:"User" },
		{ id:9, name:"Matt Lauigan", email:"matt@mail.com", role:"Admin"},
		{ id:10, name:"Matt Lauigan", email:"matt@mail.com", role:"Admin"},
		{ id:11, name:"Jane", email:"jane@mail.com", role:"User" },
		{ id:12, name:"Matt Lauigan", email:"matt@mail.com", role:"Admin"},
		{ id:13, name:"Jane", email:"jane@mail.com", role:"User" },
		{ id:14, name:"Matt Lauigan", email:"matt@mail.com", role:"Admin"},
		{ id:15, name:"Jane", email:"jane@mail.com", role:"User" },
		{ id:16, name:"Matt Lauigan", email:"matt@mail.com", role:"Admin"},
		{ id:17, name:"Jane", email:"jane@mail.com", role:"User" },
		{ id:18, name:"Matt Lauigan", email:"matt@mail.com", role:"Admin"},
		{ id:19, name:"Jane", email:"jane@mail.com", role:"User" },
		
		{ id:20, name:"Matt Lauigan", email:"matt@mail.com", role:"Admin"},
		{ id:21, name:"Jane", email:"jane@mail.com", role:"User" },
		{ id:22, name:"Matt Lauigan", email:"matt@mail.com", role:"Admin"},
		{ id:23, name:"Jane", email:"jane@mail.com", role:"User" },
		{ id:24, name:"Matt Lauigan", email:"matt@mail.com", role:"Admin"},
		{ id:25, name:"Jane", email:"jane@mail.com", role:"User" },
		{ id:26, name:"Matt Lauigan", email:"matt@mail.com", role:"Admin"},
		{ id:27, name:"Jane", email:"jane@mail.com", role:"User" },
		{ id:28, name:"Matt Lauigan", email:"matt@mail.com", role:"Admin"},
		{ id:29, name:"Jane", email:"jane@mail.com", role:"User" },

		{ id:30, name:"Matt Lauigan", email:"matt@mail.com", role:"Admin"},
		{ id:31, name:"Jane", email:"jane@mail.com", role:"User" },
		{ id:32, name:"Matt Lauigan", email:"matt@mail.com", role:"Admin"},
		{ id:33, name:"Jane", email:"jane@mail.com", role:"User" },
		{ id:34, name:"Matt Lauigan", email:"matt@mail.com", role:"Admin"},
		{ id:35, name:"Jane", email:"jane@mail.com", role:"User" },
		{ id:36, name:"Matt Lauigan", email:"matt@mail.com", role:"Admin"},
		{ id:37, name:"Jane", email:"jane@mail.com", role:"User" },
		{ id:38, name:"Matt Lauigan", email:"matt@mail.com", role:"Admin"},
		{ id:39, name:"Jane", email:"jane@mail.com", role:"User" },

	]

	const columns  : Column<User>[]= [
		{ key:"id", header:"ID" , class:'w-16', alignment:'right', sortable:true},
		{ key:"name", header:"Name" , class:'w-64', alignment:'right'},
		{ key:"email", header:"Email" ,alignment:'right'},
		{ key:"role", header:"Role",alignment:'right' }
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

<TableGrid
	data={users}
	{columns}
	{actions}
	
/>