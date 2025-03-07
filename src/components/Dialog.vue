<template>
    <!-- Overlay du dialogue -->
    <Teleport to="body">
      <div
        v-if="modelValue"
        class="dialog-overlay"
        :class="{ active: modelValue }"
        @click="closeOnClickOutside ? $emit('update:modelValue', false) : null"
      >
        <div class="dialog" @click.stop>
          <!-- En-tête du dialogue -->
          <div class="dialog-header">
            <h2 class="dialog-title">{{ title }}</h2>
            <button
              v-if="showCloseIcon"
              class="dialog-close"
              @click="$emit('update:modelValue', false)"
            >
              &times;
            </button>
          </div>
  
          <!-- Contenu du dialogue -->
          <div class="dialog-content">
            <EmployesListe></EmployesListe>
          </div>
  
        </div>
      </div>
    </Teleport>
</template>
  
<script setup>
  import { onMounted, onUnmounted, watch } from 'vue';
  import EmployesListe from '@/components/EmployesListe.vue'
  import { data } from '@/stores/data.js'
  const lesDatas = data()

  // Props avec valeurs par défaut
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Choisir l\'employé'
    },
    showCloseIcon: {
      type: Boolean,
      default: true
    },
    closeOnClickOutside: {
      type: Boolean,
      default: true
    },
    closeOnEsc: {
      type: Boolean,
      default: true
    },
    showDefaultButtons: {
      type: Boolean,
      default: true
    },
  });
  
  // Événements émis
  const emit = defineEmits(['update:modelValue', 'cancel', 'confirm']);
  
  // Gestionnaires d'événements
  const onCancel = () => {
    emit('cancel');
    emit('update:modelValue', false);
  };
  
  const onConfirm = () => {
    emit('confirm');
    emit('update:modelValue', false);
  };
  
  // Gestionnaire pour la touche Echap
  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && props.closeOnEsc && props.modelValue) {
      emit('update:modelValue', false);
    }
  };
  
  // Contrôle du défilement du body
  watch(() => props.modelValue, (newVal) => {
    if (newVal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });
  watch(() => lesDatas.idEmployeChoix, () => {
    if (lesDatas.idEmployeChoix) {
      onConfirm()
    }
})
  
  // Ajout/suppression des écouteurs d'événements
  onMounted(() => {
    document.addEventListener('keydown', handleKeyDown);
  });
  
  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeyDown);
    // Assurez-vous que le défilement est réactivé si le composant est détruit
    document.body.style.overflow = '';
  });
</script>
  
<style scoped>
  .dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s, visibility 0.3s;
  }
  
  .dialog-overlay.active {
    opacity: 1;
    visibility: visible;
  }
  
  .dialog {
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    width: 100%;
    max-width: 1000px;
    max-height: 200vh;
    overflow-y: auto;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    transform: translateY(-20px);
    transition: transform 0.3s;
  }
  
  .dialog-overlay.active .dialog {
    transform: translateY(0);
  }
  
  .dialog-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
  }
  
  .dialog-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
  }
  
  .dialog-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0;
    color: #666;
  }
  
  .dialog-content {
    margin-bottom: 20px;
  }
  
  .dialog-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
  
  .dialog-button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
  }
  
  .dialog-button-cancel {
    background-color: #f2f2f2;
    color: #333;
  }
  
  .dialog-button-confirm {
    background-color: #4CAF50;
    color: white;
  }
  </style>