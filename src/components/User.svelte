<script lang="ts">
  import type { Column, TableAction } from "$lib/ts/components";
  import TableGrid from "./layouts/TableGrid.svelte";
  import DataTable from "./layouts/TableGrid.svelte";
  import DeleteIcon from "./primitives/icons/deleteIcon.svelte";
  import SearchIcon from "./primitives/icons/searchIcon.svelte";

  interface User {
    id: number;
    name: string;
    email: string;
    role: string;
  }

  const users: User[] = [
    {
      id: 1,
      name: "Juan Dela Cruz",
      email: "juan.delacruz@mail.com",
      role: "Admin",
    },
    {
      id: 2,
      name: "Maria Santos",
      email: "maria.santos@mail.com",
      role: "User",
    },
    {
      id: 3,
      name: "Jose Reyes",
      email: "jose.reyes@mail.com",
      role: "Manager",
    },
    { id: 4, name: "Ana Cruz", email: "ana.cruz@mail.com", role: "User" },
    {
      id: 5,
      name: "Mark Bautista",
      email: "mark.bautista@mail.com",
      role: "Admin",
    },
    {
      id: 6,
      name: "Paula Mendoza",
      email: "paula.mendoza@mail.com",
      role: "User",
    },
    {
      id: 7,
      name: "Carlo Garcia",
      email: "carlo.garcia@mail.com",
      role: "User",
    },
    {
      id: 8,
      name: "Angelica Flores",
      email: "angelica.flores@mail.com",
      role: "Manager",
    },
    {
      id: 9,
      name: "Rafael Ramos",
      email: "rafael.ramos@mail.com",
      role: "Admin",
    },
    {
      id: 10,
      name: "Katrina Villanueva",
      email: "katrina.villanueva@mail.com",
      role: "User",
    },

    {
      id: 11,
      name: "Jerome Navarro",
      email: "jerome.navarro@mail.com",
      role: "User",
    },
    {
      id: 12,
      name: "Camille Fernandez",
      email: "camille.fernandez@mail.com",
      role: "Admin",
    },
    {
      id: 13,
      name: "Vincent Castillo",
      email: "vincent.castillo@mail.com",
      role: "User",
    },
    {
      id: 14,
      name: "Patricia Aquino",
      email: "patricia.aquino@mail.com",
      role: "Manager",
    },
    {
      id: 15,
      name: "Miguel Gonzales",
      email: "miguel.gonzales@mail.com",
      role: "User",
    },
    {
      id: 16,
      name: "Jasmine Lim",
      email: "jasmine.lim@mail.com",
      role: "Admin",
    },
    {
      id: 17,
      name: "Christian Torres",
      email: "christian.torres@mail.com",
      role: "User",
    },
    {
      id: 18,
      name: "Bea Herrera",
      email: "bea.herrera@mail.com",
      role: "User",
    },
    {
      id: 19,
      name: "Nathaniel Mercado",
      email: "nathaniel.mercado@mail.com",
      role: "Admin",
    },
    {
      id: 20,
      name: "Angela Padilla",
      email: "angela.padilla@mail.com",
      role: "Manager",
    },

    {
      id: 21,
      name: "Kevin Salazar",
      email: "kevin.salazar@mail.com",
      role: "User",
    },
    {
      id: 22,
      name: "Trisha Domingo",
      email: "trisha.domingo@mail.com",
      role: "User",
    },
    {
      id: 23,
      name: "Joshua Alonzo",
      email: "joshua.alonzo@mail.com",
      role: "Admin",
    },
    {
      id: 24,
      name: "Nicole Velasco",
      email: "nicole.velasco@mail.com",
      role: "User",
    },
    {
      id: 25,
      name: "Ronald Mendoza",
      email: "ronald.mendoza@mail.com",
      role: "Manager",
    },
    {
      id: 26,
      name: "Shane Cabrera",
      email: "shane.cabrera@mail.com",
      role: "User",
    },
    {
      id: 27,
      name: "Paolo Gutierrez",
      email: "paolo.gutierrez@mail.com",
      role: "Admin",
    },
    {
      id: 28,
      name: "Kristine David",
      email: "kristine.david@mail.com",
      role: "User",
    },
    {
      id: 29,
      name: "John Patrick Diaz",
      email: "johnpatrick.diaz@mail.com",
      role: "User",
    },
    {
      id: 30,
      name: "Elaine Manalo",
      email: "elaine.manalo@mail.com",
      role: "Manager",
    },

    {
      id: 31,
      name: "Rico Pascual",
      email: "rico.pascual@mail.com",
      role: "Admin",
    },
    {
      id: 32,
      name: "Alyssa Santiago",
      email: "alyssa.santiago@mail.com",
      role: "User",
    },
    {
      id: 33,
      name: "Gabriel Villareal",
      email: "gabriel.villareal@mail.com",
      role: "User",
    },
    {
      id: 34,
      name: "Francesca Rivera",
      email: "francesca.rivera@mail.com",
      role: "Manager",
    },
    {
      id: 35,
      name: "Carl Anthony Lopez",
      email: "carl.lopez@mail.com",
      role: "Admin",
    },
    {
      id: 36,
      name: "Sophia Mae Reyes",
      email: "sophia.reyes@mail.com",
      role: "User",
    },
  ];

  const columns: Column<User>[] = [
    {
      key: "id",
      header: "ID",
      class: "w-16",
      alignment: "center",
      sortable: true,
    },
    { key: "name", header: "Name", class: "w-64" },
    { key: "email", header: "Email" },
    { key: "role", header: "Role", alignment: "center" },
  ];

  const actions: TableAction<User>[] = [
    {
      icon: SearchIcon,
      label: "View",

      onClick: (row) => console.log("view", row),
    },
    // {
    // 	icon: ,
    // 	label:"Edit",
    // 	onClick:(row)=>console.log("edit",row)
    // },
    {
      icon: DeleteIcon,
      label: "Delete",
      onClick: (row) => console.log("delete", row),
    },
  ];
</script>

<TableGrid data={users} {columns} {actions} />
