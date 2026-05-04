"use client";

import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Plus, Trash2, Calculator, Save, X } from 'lucide-react';

const invoiceSchema = z.object({
  clientId: z.string().min(1, "Client is required"),
  poNo: z.string().optional(),
  dueDate: z.string().optional(),
  items: z.array(z.object({
    productId: z.string().min(1, "Item is required"),
    partNo: z.string().optional(),
    serviceType: z.string().optional(),
    quantity: z.number().min(1),
    price: z.number().min(0),
  })).min(1, "At least one item is required"),
});

type InvoiceFormValues = z.infer<typeof invoiceSchema>;

export default function InvoiceForm({ clients, devices, tiers, rates, onClose }: any) {
  const [selectedDevice, setSelectedDevice] = useState<string>("");
  const [selectedTier, setSelectedTier] = useState<string>("");
  
  const { register, control, handleSubmit, watch, setValue, formState: { errors } } = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      items: [{ productId: "", quantity: 1, price: 0 }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items"
  });

  const watchItems = watch("items");
  const subtotal = watchItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Auto-calculate rate when device or tier changes
  useEffect(() => {
    if (selectedDevice && selectedTier) {
      const rateObj = rates.find((r: any) => r.deviceModelId === selectedDevice && r.cityTierId === selectedTier);
      if (rateObj) {
        // Find installation item in fields or add it
        const installIndex = watchItems.findIndex(i => i.serviceType === "INSTALLATION");
        if (installIndex >= 0) {
          setValue(`items.${installIndex}.price`, rateObj.rate);
        } else {
          append({ productId: "installation-service", serviceType: "INSTALLATION", quantity: 1, price: rateObj.rate });
        }
      }
    }
  }, [selectedDevice, selectedTier, rates, setValue, append, watchItems]);

  const onSubmit = async (data: InvoiceFormValues) => {
    console.log("Invoice Data:", data);
    // Call server action here
    alert("Invoice data prepared! (Server action integration next)");
  };

  return (
    <div className="card animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto', background: 'white' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
        <h3 style={{ fontWeight: 700, fontSize: '1.25rem' }}>Create New Invoice</h3>
        <button onClick={onClose} style={{ color: '#64748b' }}><X size={24} /></button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Select Client</label>
            <select 
              {...register("clientId")}
              style={{ width: '100%', padding: '0.625rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}
            >
              <option value="">Select a client...</option>
              {clients.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            {errors.clientId && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.clientId.message}</p>}
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>PO Number (TATA)</label>
            <input 
              placeholder="e.g., 9700078288"
              {...register("poNo")}
              style={{ width: '100%', padding: '0.625rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }} 
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Due Date</label>
            <input 
              type="date" 
              {...register("dueDate")}
              style={{ width: '100%', padding: '0.625rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }} 
            />
          </div>
        </div>

        <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '0.75rem', marginBottom: '2rem' }}>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calculator size={16} /> Tier-Based Installation Calculation
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#64748b', marginBottom: '0.25rem' }}>Device Model</label>
              <select 
                value={selectedDevice} 
                onChange={(e) => setSelectedDevice(e.target.value)}
                style={{ width: '100%', padding: '0.5rem', borderRadius: '0.4rem', border: '1px solid #e2e8f0' }}
              >
                <option value="">Choose Device...</option>
                {devices.map((d: any) => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#64748b', marginBottom: '0.25rem' }}>City Tier</label>
              <select 
                value={selectedTier} 
                onChange={(e) => setSelectedTier(e.target.value)}
                style={{ width: '100%', padding: '0.5rem', borderRadius: '0.4rem', border: '1px solid #e2e8f0' }}
              >
                <option value="">Choose Tier...</option>
                {tiers.map((t: any) => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h4 style={{ fontWeight: 600 }}>Invoice Items</h4>
            <button 
              type="button" 
              onClick={() => append({ productId: "", quantity: 1, price: 0 })}
              className="btn btn-outline" 
              style={{ padding: '0.4rem 0.75rem', fontSize: '0.875rem' }}
            >
              <Plus size={16} /> Add Item
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {fields.map((field, index) => (
              <div key={field.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 0.5fr', gap: '1rem', alignItems: 'flex-start' }}>
                <div>
                  <input 
                    placeholder="Description / Service"
                    {...register(`items.${index}.productId` as const)}
                    style={{ width: '100%', padding: '0.625rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}
                  />
                </div>
                <div>
                  <input 
                    type="number"
                    placeholder="Qty"
                    {...register(`items.${index}.quantity` as const, { valueAsNumber: true })}
                    style={{ width: '100%', padding: '0.625rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}
                  />
                </div>
                <div>
                  <input 
                    type="number"
                    placeholder="Price"
                    {...register(`items.${index}.price` as const, { valueAsNumber: true })}
                    style={{ width: '100%', padding: '0.625rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}
                  />
                </div>
                <button 
                  type="button" 
                  onClick={() => remove(index)}
                  style={{ padding: '0.625rem', color: '#ef4444' }}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '2px solid #f1f5f9', paddingTop: '1.5rem', marginTop: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ width: '250px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: '#64748b' }}>
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontWeight: 700, fontSize: '1.125rem' }}>
                <span>Total Amount</span>
                <span>₹{subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>
              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ width: '100%', padding: '0.75rem' }}
              >
                <Save size={18} /> Generate Invoice
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
