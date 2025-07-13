"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState } from "react"

type MatrixFormValues = {
  rows: number
  cols: number
  matrix: string[][]
  method: "gauss" | "gauss-jordan"
}

const MatrixFormSchema = z.object({
  rows: z.coerce.number().gte(1).lte(5),
  cols: z.coerce.number().gte(2).lte(6),
  matrix: z.array(z.array(z.string())),
  method: z.enum(["gauss", "gauss-jordan"]),
})

export function FormMatrix({ onCalculate }: {
  onCalculate: (matrix: string[][], method: "gauss" | "gauss-jordan") => void
}) {
  const [dimensions, setDimensions] = useState<{ rows: number; cols: number } | null>(null)

  const form = useForm<z.input<typeof MatrixFormSchema>, any, any>({
    resolver: zodResolver(MatrixFormSchema),
    defaultValues: {
      rows: 2,
      cols: 3,
      matrix: [],
      method: "gauss",
    },
  })

  const { control, handleSubmit, getValues, setValue, watch } = form

  const handleSetMatrix = () => {
    const rows: number = getValues("rows") as number
    const cols: number = getValues("cols") as number
    const matrix = Array.from({ length: rows }, () => Array(cols).fill(""))
    setValue("matrix", matrix)
    setDimensions({ rows, cols })
  }

  const handleInputChange = (r: number, c: number, value: string) => {
    const updated = [...getValues("matrix")]
    updated[r][c] = value
    setValue("matrix", updated, { shouldValidate: true })
  }

  function onSubmit(values: MatrixFormValues) {
    onCalculate(values.matrix, values.method)
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex gap-4">
          <FormField
            control={control}
            name="rows"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Baris</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    {...field} 
                    onChange={(e) => {
                      field.onChange(e)
                      // Reset matrix ketika rows/cols berubah
                      setDimensions(null)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="cols"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kolom</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    {...field} 
                    onChange={(e) => {
                      field.onChange(e)
                      // Reset matrix ketika rows/cols berubah
                      setDimensions(null)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-end">
            <Button type="button" onClick={handleSetMatrix}>
              Buat Matriks
            </Button>
          </div>
        </div>

        {dimensions && (
          <div className="space-y-2">
            <h3 className="font-medium">Isi Nilai Matriks</h3>
            <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${dimensions.cols}, minmax(0, 60px))` }}>
              {watch("matrix").map((row, rIdx) =>
                row.map((value, cIdx) => (
                  <Input
                    key={`${rIdx}-${cIdx}`}
                    value={value}
                    onChange={(e) => handleInputChange(rIdx, cIdx, e.target.value)}
                    required
                  />
                ))
              )}
            </div>
          </div>
        )}

        <FormField
          control={control}
          name="method"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Metode</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex gap-4"
                >
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="gauss" />
                    </FormControl>
                    <FormLabel>Gauss</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="gauss-jordan" />
                    </FormControl>
                    <FormLabel>Gauss-Jordan</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <Button type="submit">Hitung</Button>
          <Button 
            type="button" 
            variant="secondary" 
            onClick={() => {
              form.reset()
              setDimensions(null)
            }}
          >
            Clear
          </Button>
        </div>
      </form>
    </Form>
  )
}