<template>
  <form @submit.prevent="submitForm" class="space-y-4">
    <div>
      <label>
        送信先メールアドレス
        <input
          id="email"
          name="email"
          v-model="email"
          type="email"
          required
          autocomplete="email"
          class="border px-2 py-1 w-full"
        />
      </label>
    </div>
    <div>
      <label>
        件名
        <input
          id="subject"
          name="subject"
          v-model="subject"
          type="text"
          required
          class="border px-2 py-1 w-full"
        />
      </label>
    </div>
    <div>
      <label>
        メッセージ
        <textarea
          id="message"
          name="message"
          v-model="text"
          required
          class="border px-2 py-1 w-full"
        ></textarea>
      </label>
    </div>
    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
      送信
    </button>

    <p v-if="successMessage" class="text-green-600">{{ successMessage }}</p>
    <p v-if="errorMessage" class="text-red-600">{{ errorMessage }}</p>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";

const email = ref("");
const subject = ref("");
const text = ref("");

const successMessage = ref("");
const errorMessage = ref("");

const submitForm = async () => {
  successMessage.value = "";
  errorMessage.value = "";

  try {
    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: email.value,
        subject: subject.value,
        text: text.value,
      }),
    });

    const result = await res.json();

    if (result.success) {
      successMessage.value = "メールを送信しました。";
      email.value = "";
      subject.value = "";
      text.value = "";
    } else {
      errorMessage.value = "メール送信に失敗しました。";
    }
  } catch (err) {
    errorMessage.value = "通信エラーが発生しました。";
    console.error(err);
  }
};
</script>
