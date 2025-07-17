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
  FormDescription,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useEffect, useState } from "react"
import type { SolveMatrixRequest } from "@/lib/api"


const MatrixFormSchema = z.object({
  rows: z.coerce.number().gte(1).lte(5),
  cols: z.coerce.number().gte(2).lte(6),
  matrix: z.array(z.array(z.coerce.number())),
  method: z.enum(["gauss", "gauss-jordan"]),
})

export function FormMatrix({ onCalculate }: {
  onCalculate: (input: SolveMatrixRequest) => void
}) {

  const form = useForm<z.input<typeof MatrixFormSchema>, any, any>({
    resolver: zodResolver(MatrixFormSchema),
    defaultValues: {
      rows: 2,
      cols: 3,
      matrix: [],
      method: "gauss",
    },
  })
  const [lastChanged, setLastChanged] = useState<"rows" | "cols" | null>(null)
  const { control, handleSubmit, getValues, setValue, watch, reset } = form
  const rows = watch("rows") as number
  const cols = watch("cols") as number 

  useEffect(() => {
    if (rows >= 1 && cols >= 2 && rows <= 5 && cols <= 6) {
      const prev = getValues("matrix")
      const nextMatrix = Array.from({ length: rows }, (_, i) =>
        Array.from({ length: cols }, (_, j) => prev[i]?.[j] ?? "")
      )
      setValue("matrix", nextMatrix)
    }
  }, [rows, cols, getValues, setValue])

  useEffect(() => {
    if (lastChanged === "rows" && rows >= 1 && rows <= 5) {
      const newCols = rows + 1
      setValue("cols", newCols)
    }
  }, [rows, lastChanged, setValue])

  useEffect(() => {
    if (lastChanged === "cols" && cols >= 2 && cols <= 6) {
      const newRows = cols - 1
      setValue("rows", newRows)
    }
  }, [cols, lastChanged, setValue])

  const matrix = watch("matrix") as number[][]

  const handleInputChange = (r: number, c: number, value: number) => {
    const updated = [...getValues("matrix") as number[][]]
    updated[r][c] = value
    setValue("matrix", updated, { shouldValidate: true })
  }

  function onSubmit(values: SolveMatrixRequest) {
    console.log("SUBMIT", values) 
    onCalculate(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-wrap gap-4">
          <h3 className="font-medium">Ukuran Matrix (Augmented):</h3>
          <FormField
            control={control}
            name="rows"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input 
                    type="number" 
                    min={1}
                    max={5}
                    {...field}
                    onChange={(e) => {
                      setLastChanged("rows")
                      field.onChange(parseInt(e.target.value))
                    }}
                  />
                </FormControl>
                <FormDescription>Baris</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          x
          <FormField
            control={control}
            name="cols"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input 
                    type="number" 
                    min={2}
                    max={6}
                    {...field}
                    onChange={(e) => {
                      setLastChanged("cols")
                      field.onChange(parseInt(e.target.value))
                    }}
                  />
                </FormControl>
                <FormDescription>Kolom</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {rows > 0 && cols > 0 && rows <= 5 && cols <= 6 && (
          <div className="space-y-2">
            <h3 className="font-medium">Matriks: A</h3>
            <div className="ml-15">
              <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
                {matrix.map((row, rIdx) =>
                  row.map((value, cIdx) => (
                    <Input
                      key={`${rIdx}-${cIdx}`}
                      type="number"
                      value={value ?? ""}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value)
                        handleInputChange(rIdx, cIdx, val)
                      }}
                      required
                      className="text-center"
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-wrap">
          <h3 className="font-medium">Metode:</h3>
          <FormField
            control={control}
            name="method"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-col gap-2 ml-1 mt-1"
                  >
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="gauss" />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">Gauss</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="gauss-jordan" />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">Gauss-Jordan</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4">
          <Button type="submit">Hitung!</Button>
          <Button 
            type="button" 
            variant="secondary" 
            onClick={() => {
              reset()
              setTimeout(() => {
                const emptyMatrix = Array.from({ length: 2 }, () =>
                  Array.from({ length: 3 }, () => "")
                )
                setValue("matrix", emptyMatrix)
              }, 0)
            }}
          >
            Hapus Semua
          </Button>
        </div>
      </form>
    </Form>
  )
}