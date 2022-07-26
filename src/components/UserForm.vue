<template>
  <a-card style="background-color: #f7f6f6">
    <a-typography-title>Crear usuario</a-typography-title>
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      @finish="finish"
    >
      <a-form-item
        label="Correo"
        name="email"
        :rules="[
          { required: true, message: '*Campo obligatorio' },
          { type: 'email', message: '*Correo incorrecto' },
        ]"
      >
        <a-input v-model:value="formState.email" />
      </a-form-item>
      <a-form-item
        label="Nombres"
        name="first_name"
        :rules="[{ required: true, message: '*Campo obligatorio' }]"
      >
        <a-input v-model:value="formState.first_name" />
      </a-form-item>
      <a-form-item
        label="Apellidos"
        name="last_name"
        :rules="[{ required: true, message: '*Campo obligatorio' }]"
      >
        <a-input v-model:value="formState.last_name" />
      </a-form-item>
      <a-form-item
        label="Cumpleaños"
        name="birthday"
        :rules="[{ required: true, message: '*Campo obligatorio' }]"
      >
        <a-date-picker v-model:value="formState.birthday" />
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">Crear</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import type { UnwrapRef } from "vue";
import { User } from "@/interfaces/User";

export default defineComponent({
  props: ["handleFinish"],
  methods: {
    async finish(values: User) {
      await this.handleFinish(values);
      this.formState = {
        email: "",
        first_name: "",
        last_name: "",
        birthday: "",
      };
    },
  },
  setup() {
    const formState: UnwrapRef<Partial<User>> = reactive({
      email: "",
      first_name: "",
      last_name: "",
      birthday: "",
    });
    return {
      formState,
    };
  },
});
</script>