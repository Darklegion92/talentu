<template>
  <a-page-header
    style="border: 1px solid rgb(235, 237, 240)"
    title="Listado de usuarios"
    :avatar="{
      src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4',
    }"
  />
  <a-row
    :gutter="[12, 12]"
    style="margin: 30px"
    type="flex"
    justify="center"
    align="top"
  >
    <a-col :xs="15" :lg="8">
      <UserForm :handleFinish="handleFinish" />
    </a-col>
    <a-col :xs="23" :lg="15">
      <a-table :columns="columns" :dataSource="users">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'fullName'">
            {{ record.last_name }} {{ record.last_name }}
          </template>
        </template>
      </a-table>
    </a-col>
  </a-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Modal } from "ant-design-vue";
import UserForm from "./UserForm.vue";
import { getUsers } from "@/services/UserService";
import { User } from "@/interfaces/User";
import { getUsersLocal } from "@/utils/localstorage";
import { createUser } from "@/services/UserService";

export default defineComponent({
  components: {
    UserForm,
  },
  data() {
    return {
      users: [] as User[],
      columns: [
        {
          title: "id",
          dataIndex: "id",
          key: "id",
        },
        {
          title: "Nombre",
          dataIndex: "first_name",
          key: "fullName",
        },
        {
          title: "Edad",
          dataIndex: "age",
          key: "age",
        },
        {
          title: "Email",
          dataIndex: "email",
          key: "email",
        },
      ],
    };
  },
  methods: {
    async loadUsers() {
      if (this.users.length === 0) {
        try {
          await getUsers();
        } catch (e: any) {
          Modal.error({
            title: "Error al consultar usuarios",
            content: e?.message,
          });
        }
      }
      this.users = await getUsersLocal();
    },
    async handleFinish(values: User) {
      try {
        this.users = await createUser(values);
        Modal.success({
          title: "Usuario creado",
          content: `El usuario "${values.first_name} ${values.last_name}" ha sido creado correctamente`,
        });
      } catch (e: any) {
        Modal.error({
          title: "Error al crear usuario",
          content: e?.message,
        });
      }
    },
  },
  mounted() {
    this.loadUsers();
  },
});
</script>